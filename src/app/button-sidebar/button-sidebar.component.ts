import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-button-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button-sidebar.component.html',
  styleUrl: './button-sidebar.component.css',
})
export class ButtonSidebarComponent {
  @Input() label!: string;
  @Input() link!: string;
}
