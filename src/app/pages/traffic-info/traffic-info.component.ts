import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-traffic-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-info.component.html',
  styleUrls: ['./traffic-info.component.css']
})
export class TrafficInfoComponent {
  // date demo — le poți lega ulterior dintr-un API
  distanceKm = 10.1;
  durationMin = 21;
  incidents = [
    {
      icon: '🚧',
      title: 'Traffic diverted at Unirii Square',
      bullets: ['12 min - Reported 5 min ago', '1.1 km ahead']
    },
    {
      icon: '🚦',
      title: 'Road diversion on Unirii Boulevard',
      bullets: ['+5 min - Reported 30 min ago', '900 m ahead']
    }
  ];
}
