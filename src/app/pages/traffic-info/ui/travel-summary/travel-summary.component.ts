import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-travel-summary',
  standalone: true,
  imports: [CardModule, BadgeModule],
  templateUrl: './travel-summary.component.html',
  styleUrls: ['./travel-summary.component.css']
})
export class TravelSummaryComponent {
  @Input() minutes = 0;
  @Input() distanceKm = 0;
}
