import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';   // ✅ AICI

@Component({
  selector: 'app-traffic-incident-card',
  standalone: true,
  imports: [CommonModule, CardModule, DividerModule],  // ✅ Adaugă CommonModule aici
  templateUrl: './traffic-incident-card.component.html',
  styleUrls: ['./traffic-incident-card.component.css']
})
export class TrafficIncidentCardComponent {
  @Input() icon = 'pi pi-exclamation-triangle';
  @Input() iconColor = '#f59e0b';
  @Input() title = '';
  @Input() bullets: string[] = [];
}
