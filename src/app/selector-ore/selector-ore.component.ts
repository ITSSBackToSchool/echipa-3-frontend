import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selector-ore',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector-ore.component.html',
  styleUrls: ['./selector-ore.component.css'],
})
export class SelectorOreComponent {
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
    if (this.startIndex === null) {
      this.startIndex = index;
      this.endIndex = index;
    } else if (
      this.endIndex !== null &&
      (index === this.endIndex + 1 || index === this.startIndex - 1)
    ) {
      if (index > this.endIndex!) {
        this.endIndex = index;
      } else if (index < this.startIndex!) {
        this.startIndex = index;
      }
    } else {
      this.startIndex = index;
      this.endIndex = index;
    }
    console.log(`Acesta e start ${this.startIndex}`);
    console.log(`Acesta e end ${this.endIndex}`);
  }

  isSelected(index: number): boolean {
    if (this.startIndex === null || this.endIndex === null) return false;
    return index >= this.startIndex && index <= this.endIndex;
  }
}
