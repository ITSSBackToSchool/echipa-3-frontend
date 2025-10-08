import { Component } from '@angular/core';
import { CalendarSeatsComponent } from '../../calendar-seats/calendar-seats.component';
import { SeatSelectorComponent } from '../../seat-selector/seat-selector.component';
import { CommonModule } from '@angular/common';
import { ButtonConfirmComponent } from '../../button-confirm/button-confirm.component';
@Component({
  selector: 'app-office-seats',
  standalone: true,
  imports: [CalendarSeatsComponent, SeatSelectorComponent, CommonModule],
  templateUrl: './office-seats.component.html',
  styleUrl: './office-seats.component.css',
})
export class OfficeSeatsComponent {
  date: Date[] | undefined;
  selectedFloor: string | null = null;
  selectedSeat: number | null = null;

  onSeatSelected(event: { floor: string; seat: number }) {
    this.selectedFloor = event.floor;
    this.selectedSeat = event.seat;
  }
}
