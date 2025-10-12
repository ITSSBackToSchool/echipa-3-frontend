import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
type FloorName = 'Parter' | 'Etaj 1' | 'Etaj 2';

@Component({
  selector: 'app-seat-selector',
  templateUrl: './seat-selector.component.html',
  styleUrls: ['./seat-selector.component.css'],
  imports: [CommonModule, MatTabsModule],
  standalone: true,
})
export class SeatSelectorComponent {
  @Input() selectedDate!: Date | null;
  @Input() seatData: Record<FloorName, any[]> = {
    Parter: [],
    'Etaj 1': [],
    'Etaj 2': [],
  };

  @Output() seatSelected = new EventEmitter<{
    floor: FloorName;
    seat: number;
  }>();

  selectedFloor: FloorName = 'Parter';
  selectedSeats: { [key in FloorName]: number | null } = {
    Parter: null,
    'Etaj 1': null,
    'Etaj 2': null,
  };
  // single selected seat model (same as previous working configuration)
  selectedSeat: string | number | null = null;

  selectSeat(floor: FloorName, seat: number) {
    // set the active floor to the clicked floor
    this.selectedFloor = floor;

    // prevent selecting an occupied seat; support multiple seat object shapes
    const seatsOnFloor = this.seatData[floor] || [];
    const seatObj = seatsOnFloor.find(
      (s: any) => s.id === seat || s.seat === seat || s.seatNumber === seat
    );
    const occupied = seatObj ? seatObj.occupied ?? seatObj.isOccupied : false;
    if (occupied) {
      return; // ignore clicks on occupied seats
    }

    // set single selected seat (global)
    this.selectedSeat = seat;
    console.log('seat selected ->', {
      floor: this.selectedFloor,
      seat: this.selectedSeat,
      seatObj,
    });
    this.seatSelected.emit({ floor, seat });
  }

  onTabChange(event: any) {
    const labels: FloorName[] = ['Parter', 'Etaj 1', 'Etaj 2'];
    this.selectedFloor = labels[event.index];
  }

  // allow parent to clear the current selection
  clearSelection() {
    this.selectedSeat = null;
    this.selectedFloor = 'Parter';
  }
}
