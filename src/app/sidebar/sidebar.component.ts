import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonSidebarComponent } from '../button-sidebar/button-sidebar.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, ButtonSidebarComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {}
