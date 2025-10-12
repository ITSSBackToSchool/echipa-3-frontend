import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { time } from 'node:console';

@Component({
  selector: 'app-selector-ore',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector-ore.component.html',
  styleUrls: ['./selector-ore.component.css'],
})
export class SelectorOreComponent {
  @Input() timeslots: Array<{
    start: string;
    end: string;
    available: boolean;
  }> | null = null;

  ore = [
    '9AM - 10AM',
    '10AM - 11AM',
    '11AM - 12PM',
    '12PM - 1PM',
    '1PM - 2PM',
    '2PM - 3PM',
  ];

  startIndex: number | null = null;
  endIndex: number | null = null;

  toggleSelection(index: number) {
    const available = this.isAvailable(index);
    if (!available) {
      return;
    }

    if (this.startIndex === null) {
      this.startIndex = index;
      this.endIndex = index;

      return;
    }

    if (this.endIndex !== null && index === this.endIndex + 1) {
      if (this.isAvailable(index)) {
        this.endIndex = index;
        return;
      }
    }

    if (this.startIndex !== null && index === this.startIndex - 1) {
      if (this.isAvailable(index)) {
        this.startIndex = index;
        return;
      }
    }

    this.startIndex = index;
    this.endIndex = index;
  }

  isSelected(index: number): boolean {
    if (this.startIndex === null || this.endIndex === null) return false;
    return index >= this.startIndex && index <= this.endIndex;
  }

  isAvailable(index: number): boolean {
    if (this.timeslots && this.timeslots.length > index) {
      return Boolean(this.timeslots[index].available);
    }

    return true;
  }
}
