import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-seat-selector',
  standalone: true,
  imports: [MatTabsModule, CommonModule],
  templateUrl: './seat-selector.component.html',
  styleUrl: './seat-selector.component.css',
})
export class SeatSelectorComponent {
  @Output() seatSelected = new EventEmitter<{ floor: string; seat: number }>();

  seats = Array.from({ length: 17 }, (_, i) => i + 1);
  selectedSeat: number | null = null;
  selectedFloor: string = 'Parter';

  onTabChange(event: any) {
    const labels = ['Parter', 'Etaj 1', 'Etaj 2'];
    this.selectedFloor = labels[event.index];
    this.selectedSeat = null;
  }

  selectSeat(seat: number) {
    this.selectedSeat = seat;
    this.seatSelected.emit({
      floor: this.selectedFloor,
      seat: seat,
    });
  }
}
