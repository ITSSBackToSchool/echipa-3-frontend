import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { ButtonDemo } from '../../button-demo/button-demo.component';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [ButtonDemo, Button],
})
export class HomeComponent {}
