import { Component } from '@angular/core';
import { RoomSelectorComponent } from '../../room-selector/room-selector.component';
import { CalendarConferenceComponent } from '../../calendar-conference/calendar-conference.component';
import { SelectorOreComponent } from '../../selector-ore/selector-ore.component';

@Component({
  selector: 'app-conference-rooms',
  standalone: true,
  imports: [
    RoomSelectorComponent,
    CalendarConferenceComponent,
    SelectorOreComponent,
  ],
  templateUrl: './conference-rooms.component.html',
  styleUrl: './conference-rooms.component.css',
})
export class ConferenceRoomsComponent {
  selectedRoomId: number | null = null;
  selectedDay: string | null = null; // YYYY-MM-DD

  onRoomSelected(roomId: number) {
    this.selectedRoomId = roomId;
    this.tryFetchTimeslots();
  }

  onDaySelected(day: string) {
    this.selectedDay = day;
    this.tryFetchTimeslots();
  }

  // Build dateStart/dateEnd with fixed times and fetch timeslots
  async tryFetchTimeslots() {
    if (!this.selectedRoomId || !this.selectedDay) return;
    const dateStart = `${this.selectedDay}T00:00`;
    const dateEnd = `${this.selectedDay}T23:00`;
    const url = `http://localhost:8080/rooms/timeslots?roomId=${encodeURIComponent(
      String(this.selectedRoomId)
    )}&dateStart=${encodeURIComponent(dateStart)}&dateEnd=${encodeURIComponent(dateEnd)}`;
    console.log('Fetching timeslots GET', url);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const text = await res.text();
        console.error('Non-OK response fetching timeslots', res.status, text);
        return;
      }
      const data = await res.json();
      console.log('Timeslots response:', data);
    } catch (err) {
      console.error('Error fetching timeslots', err);
    }
  }
}
