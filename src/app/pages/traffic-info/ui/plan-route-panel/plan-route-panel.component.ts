import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-plan-route-panel',
  standalone: true,
  imports: [CardModule, InputGroupModule, InputTextModule, ButtonModule, FloatLabelModule, IconFieldModule, InputIconModule],
  templateUrl: './plan-route-panel.component.html',
  styleUrls: ['./plan-route-panel.component.css']
})
export class PlanRoutePanelComponent {}
