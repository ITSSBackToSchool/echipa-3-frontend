import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

/** @title Datepicker inline calendar example */
@Component({
  selector: 'app-calendar-seats-component',
  templateUrl: './calendar-seats.component.html',
  styleUrl: './calendar-seats.component.css',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSeatsComponent {
  selected = model<Date | null>(null);
}
