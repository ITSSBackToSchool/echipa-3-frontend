import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

const COMPANY_ADDRESS = 'Aleea Țibleș nr.3';

type Reservation = {
  id: number;
  status: string;                // 'ACTIVE' | 'COMPLETED' | 'CANCELLED'/'CANCELED'
  seatId?: number | null;        // Office dacă NU e null
  roomId?: number | null;        // Conference dacă NU e null
  seatNumber?: string | null;
  roomName?: string | null;
  buildingName?: string | null;  // ex: "Biroul 3"
  floorName?: string | null;     // ex: "Parter"
  reservationDateStart: string;  // 'YYYY-MM-DD' sau 'YYYY-MM-DD HH:mm[:ss]' / ISO
  reservationDateEnd?: string | null;
};

type NextVisitVM = {
  exists: boolean;
  isOffice?: boolean;
  title?: string;
  sub?: string;
  dayLabel?: string;
  timeLabel?: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  vm: NextVisitVM = { exists: false };
  loading = false;
  error: string | null = null;

  /** ⇩ nou: mesajul din header */
  worksToday = false;

  async ngOnInit(): Promise<void> {
    await this.loadNextVisit();
  }

  private async loadNextVisit() {
    this.loading = true;
    this.error = null;

    try {
      const url = `http://localhost:8080/reservations/user?userId=1&status=ACTIVE`;
      const res = await fetch(url);
      if (!res.ok) {
        this.error = `Eroare la citirea rezervărilor: ${res.status}`;
        this.vm = { exists: false };
        this.worksToday = false;
        return;
      }

      const data = await res.json();
      const list: Reservation[] = Array.isArray(data) ? data : (data ? [data] : []);

      // următoarea vizită (regulile de prioritate)
      const next = this.pickNextVisit(list);
      this.vm = next ? this.toViewModel(next) : { exists: false };

      // ⇩ calculează dacă LUCREZI AZI (există rezervare de azi ne-terminată)
      this.worksToday = this.computeWorksToday(list);
    } catch (e) {
      console.error('loadNextVisit error', e);
      this.error = 'Nu am putut încărca rezervările.';
      this.vm = { exists: false };
      this.worksToday = false;
    } finally {
      this.loading = false;
    }
  }

  /** Parsează local: 'YYYY-MM-DD' sau 'YYYY-MM-DD HH:mm[:ss]' / ISO. */
  private parseLocalDate(value: string | null | undefined): Date | null {
    if (!value) return null;
    let v = value.trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
      const [y, m, d] = v.split('-').map(Number);
      return new Date(y, m - 1, d);
    }

    v = v.replace(' ', 'T').replace(/\.\d+$/, '');
    const d = new Date(v); // local (nu adaug 'Z')
    return isNaN(d.getTime()) ? null : d;
  }

  private startOfDay(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  }
  private isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }

  /** Alege următoarea vizită.
   *  Reguli:
   *   - compar ziua (calendar day)
   *   - dacă e aceeași zi → Office > Conference
   *   - tie-breaker: ora de start
   *  Filtru viitor: păstrăm dacă end>=now sau start>=now.
   */
  private pickNextVisit(list: Reservation[]): Reservation | null {
    const now = new Date();

    const rows = list
      .filter(r => (r.status ?? '').toUpperCase() === 'ACTIVE')
      .map(r => {
        const isConference = r.roomId != null; // detectăm direct Conference
        const isOffice = !isConference;

        if (isOffice) {
          // Office: avem doar ziua; UI 09:00–17:00
          const day = this.parseLocalDate(r.reservationDateStart);
          if (!day) return null;
          const dayOnly = this.startOfDay(day);
          const start = new Date(dayOnly.getFullYear(), dayOnly.getMonth(), dayOnly.getDate(), 9, 0, 0);
          const end   = new Date(dayOnly.getFullYear(), dayOnly.getMonth(), dayOnly.getDate(), 17, 0, 0);
          return { r, isOffice, dayOnly, start, end };
        } else {
          // Conference: folosim start/end reale
          const s = this.parseLocalDate(r.reservationDateStart);
          const e = this.parseLocalDate(r.reservationDateEnd ?? r.reservationDateStart);
          if (!s || !e) return null;
          const dayOnly = this.startOfDay(s);
          return { r, isOffice: false, dayOnly, start: s, end: e };
        }
      })
      .filter((x): x is { r: Reservation; isOffice: boolean; dayOnly: Date; start: Date; end: Date } => !!x)
      .filter(x => x.end.getTime() >= now.getTime() || x.start.getTime() >= now.getTime());

    if (rows.length === 0) return null;

    rows.sort((a, b) => {
      if (!this.isSameDay(a.dayOnly, b.dayOnly)) {
        return a.dayOnly.getTime() - b.dayOnly.getTime();
      }
      if (a.isOffice !== b.isOffice) return a.isOffice ? -1 : 1;
      return a.start.getTime() - b.start.getTime();
    });

    return rows[0].r;
  }

  /** Determină dacă „azi lucrezi de la birou”. */
  private computeWorksToday(list: Reservation[]): boolean {
    const now = new Date();
    const today = this.startOfDay(now);

    for (const r of list) {
      if ((r.status ?? '').toUpperCase() !== 'ACTIVE') continue;

      if (r.roomId != null) {
        // Conference: azi dacă start e azi și nu s-a terminat încă
        const s = this.parseLocalDate(r.reservationDateStart);
        const e = this.parseLocalDate(r.reservationDateEnd ?? r.reservationDateStart);
        if (!s || !e) continue;
        if (this.isSameDay(this.startOfDay(s), today) && e.getTime() > now.getTime()) {
          return true;
        }
      } else {
        // Office: zi întreagă 09:00–17:00
        const d = this.parseLocalDate(r.reservationDateStart);
        if (!d) continue;
        const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9, 0, 0);
        const end   = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 17, 0, 0);
        if (this.isSameDay(this.startOfDay(d), today) && end.getTime() > now.getTime()) {
          return true;
        }
      }
    }
    return false;
  }

  /** Mapare către UI (cardul albastru) */
  private toViewModel(r: Reservation): NextVisitVM {
    const isConference = r.roomId != null;
    const isOffice = !isConference;

    const building = (r.buildingName ?? '').trim();
    const floor = (r.floorName ?? '').trim();
    const titleBase = [building, floor].filter(Boolean).join(' - ');
    const title = isOffice
      ? (titleBase || 'Birou')
      : (r.roomName || titleBase || 'Conference Room');

    let dayLabel = '';
    let timeLabel = '';

    if (isOffice) {
      const day = this.parseLocalDate(r.reservationDateStart)!;
      dayLabel = day.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' });
      timeLabel = '9AM–17PM';
    } else {
      const s = this.parseLocalDate(r.reservationDateStart)!;
      const e = this.parseLocalDate(r.reservationDateEnd ?? r.reservationDateStart)!;
      dayLabel = s.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' });
      const fmt = (x: Date) =>
        x.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit', hour12: false });
      timeLabel = `${fmt(s)}–${fmt(e)}`;
    }

    return { exists: true, isOffice, title, sub: COMPANY_ADDRESS, dayLabel, timeLabel };
  }
}
