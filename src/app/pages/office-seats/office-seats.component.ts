import { Component, ViewChild } from '@angular/core';
import { CalendarSeatsComponent } from '../../calendar-seats/calendar-seats.component';
import { SeatSelectorComponent } from '../../seat-selector/seat-selector.component';
import { CommonModule } from '@angular/common';
import { ButtonConfirmComponent } from '../../button-confirm/button-confirm.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-office-seats',
  standalone: true,
  imports: [
    CalendarSeatsComponent,
    SeatSelectorComponent,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './office-seats.component.html',
  styleUrls: ['./office-seats.component.css'],
})
export class OfficeSeatsComponent {
  selectedDate: Date | null = null;
  selectedFloor: string | null = null;
  selectedSeat: number | null = null;
  selectedRangeStart: string | null = null;
  selectedRangeEnd: string | null = null;

  seatData: Record<string, { seat: number; isOccupied: boolean }[]> = {};

  @ViewChild(SeatSelectorComponent) seatSelector?: SeatSelectorComponent;
  @ViewChild(CalendarSeatsComponent) calendar?: CalendarSeatsComponent;

  constructor(private http: HttpClient) {}

  formatDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  onDateRangeSelected(range: { start: string; end: string }) {
    this.selectedDate = new Date(range.start);
    this.selectedRangeStart = range.start;
    this.selectedRangeEnd = range.end;
    this.fetchSeatData(range.start, range.end);
  }

  confirmReservation() {
    if (
      !this.selectedSeat ||
      !this.selectedRangeStart ||
      !this.selectedRangeEnd
    ) {
      console.error('Missing selected seat or date range for reservation');
      return;
    }

    const body = {
      userId: 1,
      seatIds: [this.selectedSeat],
      reservationDateStart: this.selectedRangeStart + ':00',
      reservationDateEnd: this.selectedRangeEnd + ':00',
    };

    const url = 'http://localhost:8080/reservations/seats';
    console.log('POST reservation', url, body);
    this.http.post(url, body).subscribe({
      next: () => {
        alert('Reservation success!');

        if (this.selectedRangeStart && this.selectedRangeEnd) {
          this.fetchSeatData(this.selectedRangeStart, this.selectedRangeEnd);
        }
      },
      error: () => {
        alert(`Locul a fost deja rezervat`);
        if (this.selectedRangeStart && this.selectedRangeEnd) {
          this.fetchSeatData(this.selectedRangeStart, this.selectedRangeEnd);
        }
      },
    });
  }

  onSeatSelected(event: { floor: string; seat: number }) {
    this.selectedFloor = event.floor;
    this.selectedSeat = event.seat;
  }

  resetSelection() {
    this.selectedSeat = null;
    this.selectedFloor = null;
    if (this.seatSelector) this.seatSelector.clearSelection();

    const now = new Date();
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const end = new Date(now);
    end.setHours(23, 59, 0, 0);
    this.selectedRangeStart = this.formatDate(start);
    this.selectedRangeEnd = this.formatDate(end);
    this.selectedDate = start;
    // update calendar UI to show today's date
    try {
      if (this.calendar) this.calendar.setSelectedDate(start);
    } catch (e) {
      console.warn('Could not update calendar on reset', e);
    }
    this.fetchSeatData(this.selectedRangeStart, this.selectedRangeEnd);
  }

  fetchSeatData(dateStart: string, dateEnd: string) {
    const start = dateStart;
    const end = dateEnd;

    const floorMap: Record<string, number> = {
      Parter: 1,
      'Etaj 1': 2,
      'Etaj 2': 3,
    };

    for (const floor in floorMap) {
      const floorId = floorMap[floor];
      console.log('Floor id:', floorId);
      console.log('Date start:', start);
      console.log('Date end:', end);
      const url = `http://localhost:8080/seats/freeSeats?floorId=${floorId}&dateStart=${start}&dateEnd=${end}`;
      console.log('Apel API:', url);

      this.http.get(url).subscribe({
        next: (data) => {
          console.log(`Răspuns API pentru ${floor}:`, data);
          this.seatData[floor] = data as {
            seat: number;
            isOccupied: boolean;
          }[];
        },
        error: (err) => {
          console.error(`Eroare API pentru ${floor}:`, err);
        },
      });
    }
  }
}
