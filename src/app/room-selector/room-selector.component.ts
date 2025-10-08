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
  cards = [1, 2, 3, 4, 5]; // lista de carduri

  constructor() {}
}
