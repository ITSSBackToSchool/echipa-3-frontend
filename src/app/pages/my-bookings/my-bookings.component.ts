import { Component } from '@angular/core';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css',
})
export class MyBookingsComponent {
  selected: string = 'active'; // butonul selectat inițial

  select(status: string) {
    this.selected = status;
    console.log('Buton selectat:', status);
    // aici poți pune logica ta, ex: filtrare carduri
  }
}
