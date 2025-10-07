import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PlanRoutePanelComponent } from './ui/plan-route-panel/plan-route-panel.component';
import { TravelSummaryComponent } from './ui/travel-summary/travel-summary.component';
import { TrafficIncidentCardComponent } from './ui/traffic-incident-card/traffic-incident-card.component';

@Component({
  selector: 'app-traffic-info',
  standalone: true,
  imports: [CardModule, DividerModule, PlanRoutePanelComponent, TravelSummaryComponent, TrafficIncidentCardComponent],
  templateUrl: './traffic-info.component.html',
  styleUrls: ['./traffic-info.component.css']
})
export class TrafficInfoComponent {
  // mock demo până legi datele reale
  distanceKm = 10.1;
  durationMin = 21;
  incidents = [
    {
      icon: 'pi pi-exclamation-triangle',
      iconColor: '#f59e0b',
      title: 'Traffic diverted at Unirii Square',
      bullets: ['12 min - Reported 5 min ago', '1,1 km ahead']
    },
    {
      icon: 'pi pi-directions',
      iconColor: '#f59e0b',
      title: 'Road diversion on Unirii Boulevard',
      bullets: ['+5 min - Reported 30 min ago', '900 m ahead']
    }
  ];
}
