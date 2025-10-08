import { ChangeDetectionStrategy, Component, model } from '@angular/core';
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
export class CalendarConferenceComponent {
  selected = model<Date | null>(null);
}
