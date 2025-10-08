import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-confirm.component.html',
  styleUrls: ['./button-confirm.component.css'],
})
export class ButtonConfirmComponent {
  @Input() customClass = '';
}
