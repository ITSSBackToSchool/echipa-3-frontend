import { Component } from '@angular/core';
import { RoomSelectorComponent } from '../../room-selector/room-selector.component';

@Component({
  selector: 'app-conference-rooms',
  standalone: true,
  imports: [RoomSelectorComponent],
  templateUrl: './conference-rooms.component.html',
  styleUrl: './conference-rooms.component.css',
})
export class ConferenceRoomsComponent {}
