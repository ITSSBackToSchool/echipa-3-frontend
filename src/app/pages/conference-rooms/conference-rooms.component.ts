import { Component } from '@angular/core';
import { RoomSelectorComponent } from '../../room-selector/room-selector.component';
import { CalendarConferenceComponent } from '../../calendar-conference/calendar-conference.component';
import { MatTabNav } from '@angular/material/tabs';
import { SelectorOreComponent } from '../../selector-ore/selector-ore.component';

@Component({
  selector: 'app-conference-rooms',
  standalone: true,
  imports: [
    RoomSelectorComponent,
    CalendarConferenceComponent,
    MatTabNav,
    SelectorOreComponent,
  ],
  templateUrl: './conference-rooms.component.html',
  styleUrl: './conference-rooms.component.css',
})
export class ConferenceRoomsComponent {}
