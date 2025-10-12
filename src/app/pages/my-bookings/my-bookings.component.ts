import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css',
})
export class MyBookingsComponent implements OnInit {
  // status values: ACTIVE | COMPLETED | CANCELLED
  selected: string = 'ACTIVE'; // butonul selectat inițial
  reservations: any[] = [];

  select(status: string) {
    this.selected = status;
    console.log('Buton selectat:', status);
    // fetch reservations for selected status
    this.fetchReservations(status);
  }

  ngOnInit(): void {
    this.fetchReservations(this.selected);
  }

  async fetchReservations(status: string) {
    try {
      const url = `http://localhost:8080/reservations/user?userId=1&status=${encodeURIComponent(
        status
      )}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.error('Error fetching reservations', res.status);
        return;
      }
      const data = await res.json();
      // backend may return array or single object
      if (Array.isArray(data)) this.reservations = data;
      else if (data) this.reservations = [data];
      else this.reservations = [];
      console.log('Reservations loaded', this.reservations);
    } catch (err) {
      console.error('Fetch reservations failed', err);
    }
  }

  async cancelReservation(id: number) {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    try {
      const url = `http://localhost:8080/reservations/${encodeURIComponent(
        String(id)
      )}`;
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) {
        alert('Reservation cancelled');
        // refresh current list
        this.fetchReservations(this.selected);
      } else {
        const text = await res.text();
        console.error('Cancel failed', res.status, text);
        alert(`Cancel failed: ${text}`);
      }
    } catch (err) {
      console.error('Error cancelling reservation', err);
      alert('Cancel error');
    }
  }
}
