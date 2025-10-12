import { Component } from '@angular/core';
import { RoomSelectorComponent } from '../../room-selector/room-selector.component';
import { CalendarConferenceComponent } from '../../calendar-conference/calendar-conference.component';
import { SelectorOreComponent } from '../../selector-ore/selector-ore.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-conference-rooms',
  standalone: true,
  imports: [
    RoomSelectorComponent,
    CalendarConferenceComponent,
    SelectorOreComponent,
  ],
  templateUrl: './conference-rooms.component.html',
  styleUrl: './conference-rooms.component.css',
})
export class ConferenceRoomsComponent {
  @ViewChild(SelectorOreComponent) selectorOre?: SelectorOreComponent;
  selectedRoomId: number | null = null;
  selectedDay: string | null = null;
  timeslots: Array<{ start: string; end: string; available: boolean }> = [];
  selectedRangeStart: string | null = null;
  selectedRangeEnd: string | null = null;

  onRoomSelected(roomId: number) {
    this.selectedRoomId = roomId;
    this.tryFetchTimeslots();
  }

  onDaySelected(day: string) {
    this.selectedDay = day;
    this.tryFetchTimeslots();
  }

  onRangeSelected(range: { start: string; end: string } | null) {
    if (!range) {
      this.selectedRangeStart = null;
      this.selectedRangeEnd = null;
      return;
    }
    this.selectedRangeStart = this.normalizeToSeconds(range.start);
    this.selectedRangeEnd = this.normalizeToSeconds(range.end);
    console.log(
      'Selected range set:',
      this.selectedRangeStart,
      this.selectedRangeEnd
    );
  }

  private normalizeToSeconds(dt: string): string {
    if (!dt) return dt;

    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dt)) return dt + ':00';

    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(dt)) return dt;

    const d = new Date(dt);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  async confirmReservation() {
    if (
      !this.selectedRoomId ||
      !this.selectedRangeStart ||
      !this.selectedRangeEnd
    ) {
      alert('Please select a room and a timeslot before confirming');
      return;
    }

    const body = {
      userId: 1,
      roomId: this.selectedRoomId,
      reservationDateStart: this.selectedRangeStart,
      reservationDateEnd: this.selectedRangeEnd,
    };

    const url = 'http://localhost:8080/reservations/rooms';
    console.log('POST reservation', url, body);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        this.tryFetchTimeslots();
        alert('Reservation success!');
      } else {
        const text = await res.text();
        console.error('Reservation failed', res.status, text);
        alert(`Reservation failed: ${text}`);
        this.tryFetchTimeslots();
      }
    } catch (err) {
      console.error('Error posting reservation', err);
      alert('Reservation error');
    } finally {
      try {
        if (this.selectorOre) this.selectorOre.clearSelection();
      } catch (e) {
        console.warn('Could not clear selector after reservation', e);
      }
    }
  }

  async tryFetchTimeslots() {
    if (!this.selectedRoomId || !this.selectedDay) return;
    const dateStart = `${this.selectedDay}T00:00`;
    const dateEnd = `${this.selectedDay}T23:00`;
    const url = `http://localhost:8080/rooms/timeslots?roomId=${encodeURIComponent(
      String(this.selectedRoomId)
    )}&dateStart=${encodeURIComponent(dateStart)}&dateEnd=${encodeURIComponent(
      dateEnd
    )}`;
    console.log('Fetching timeslots GET', url);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const text = await res.text();
        console.error('Non-OK response fetching timeslots', res.status, text);
        return;
      }
      const data = await res.json();
      console.log('Timeslots response:', data);
      // normalize and store
      if (Array.isArray(data)) {
        this.timeslots = data.map((t: any) => ({
          start: t.start,
          end: t.end,
          available: Boolean(t.available),
        }));
      } else {
        this.timeslots = [];
      }
    } catch (err) {
      console.error('Error fetching timeslots', err);
    }
  }
}
