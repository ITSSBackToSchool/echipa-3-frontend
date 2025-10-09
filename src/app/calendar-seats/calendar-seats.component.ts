import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

/** @title Datepicker inline calendar example */
@Component({
  selector: 'app-calendar-seats-component',
  templateUrl: './calendar-seats.component.html',
  styleUrls: ['./calendar-seats.component.css'], // fix typo
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSeatsComponent {
  selected: Date | null = null;
  startOfDay!: Date;
  endOfDay!: Date;

  // emit formatted date strings in the exact form YYYY-MM-DDTHH:mm
  @Output() dateSelected = new EventEmitter<{ start: string; end: string }>();

  onDateSelected(date: Date) {
    const selectedDate = new Date(date);

    this.startOfDay = new Date(selectedDate);
    this.startOfDay.setHours(0, 0, 0, 0);

    this.endOfDay = new Date(selectedDate);
    this.endOfDay.setHours(23, 59, 0, 0);

    console.log('Start of day:', this.formatDate(this.startOfDay));
    console.log('End of day:', this.formatDate(this.endOfDay));

    // emit start and end of the selected day so parent can use exact range
    this.dateSelected.emit({
      start: this.formatDate(this.startOfDay),
      end: this.formatDate(this.endOfDay),
    });
  }

  formatDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    return (
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )}` + `T${pad(date.getHours())}:${pad(date.getMinutes())}`
    );
  }

  sendRequest() {
    const dateStart = this.formatDate(this.startOfDay);
    const dateEnd = this.formatDate(this.endOfDay);
    console.log(dateStart, dateEnd);
  }
}
