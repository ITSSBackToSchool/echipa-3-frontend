import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-room-selector',
  standalone: true,
  imports: [MatTabsModule, CommonModule],
  templateUrl: './room-selector.component.html',
  styleUrl: './room-selector.component.css',
})
export class RoomSelectorComponent {
  cards = [1, 2, 3, 4, 5];

  selectedBuilding: 'T1' | 'T2' | null = null;

  selectedCardFloor: 'Parter' | 'Etaj 1' | 'Etaj 2' | null = null;
  selectedCardNumber: number | null = null;

  selectBuilding(building: 'T1' | 'T2') {
    this.selectedBuilding =
      this.selectedBuilding === building ? null : building;
  }

  selectCard(floor: 'Parter' | 'Etaj 1' | 'Etaj 2', card: number) {
    if (this.selectedCardFloor === floor && this.selectedCardNumber === card) {
      this.selectedCardFloor = null;
      this.selectedCardNumber = null;
    } else {
      this.selectedCardFloor = floor;
      this.selectedCardNumber = card;
    }
  }

  constructor() {}
}
