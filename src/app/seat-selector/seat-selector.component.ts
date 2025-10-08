import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-seat-selector',
  standalone: true,
  imports: [MatTabsModule, CommonModule],
  templateUrl: './seat-selector.component.html',
  styleUrl: './seat-selector.component.css',
})
export class SeatSelectorComponent {
  seats = Array.from({ length: 14 }, (_, i) => i + 1);
}
