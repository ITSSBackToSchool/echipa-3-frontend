import { Component } from '@angular/core';
import { CalendarSeatsComponent } from '../../calendar-seats/calendar-seats.component';
@Component({
  selector: 'app-office-seats',
  standalone: true,
  imports: [CalendarSeatsComponent],
  templateUrl: './office-seats.component.html',
  styleUrl: './office-seats.component.css',
})
export class OfficeSeatsComponent {
  date: Date[] | undefined;
}
