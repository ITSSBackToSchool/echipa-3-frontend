import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

/** @title Datepicker inline calendar example */
@Component({
  selector: 'app-calendar-conference-component',
  templateUrl: './calendar-conference.component.html',
  styleUrl: './calendar-conference.component.css',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarConferenceComponent implements OnChanges {
  selected: Date | null = null;

  @Input() selectedDay: string | null = null; // YYYY-MM-DD

  @Output() daySelected = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDay']) {
      const val = changes['selectedDay'].currentValue;
      if (val) {
        // parse YYYY-MM-DD
        const d = new Date(val + 'T00:00');
        this.selected = d;
      } else {
        this.selected = null;
      }
    }
  }

  onDateChange(d: Date | null) {
    this.selected = d;
    if (!d) return;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    this.daySelected.emit(`${yyyy}-${mm}-${dd}`);
  }
}
