import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-room-selector',
  standalone: true,
  imports: [MatTabsModule, CommonModule],
  templateUrl: './room-selector.component.html',
  styleUrl: './room-selector.component.css',
})
export class RoomSelectorComponent {
  selectedBuilding: 'T1' | 'T2' | null = null;

  selectedCardFloor: 'Parter' | 'Etaj 1' | 'Etaj 2' | null = null;
  selectedCardNumber: number | null = null;
  rooms: any[] = [];

  roomsByFloor: Record<string, any[]> = {};

  fetchedForFloor: Record<string, boolean> = {};

  activeFloor: 'Parter' | 'Etaj 1' | 'Etaj 2' = 'Parter';

  selectBuilding(building: 'T1' | 'T2') {
    this.selectedBuilding =
      this.selectedBuilding === building ? null : building;

    if (this.selectedBuilding) {
      this.fetchRooms(this.activeFloor, this.selectedBuilding).catch((e) =>
        console.error('Failed to fetch rooms after building select', e)
      );
    }
  }

  selectCard(floor: 'Parter' | 'Etaj 1' | 'Etaj 2', card: number) {
    if (this.selectedCardFloor === floor && this.selectedCardNumber === card) {
      this.selectedCardFloor = null;
      this.selectedCardNumber = null;
    } else {
      this.selectedCardFloor = floor;
      this.selectedCardNumber = card;
    }

    if (this.selectedBuilding && this.selectedCardFloor) {
      this.fetchRooms(this.selectedCardFloor, this.selectedBuilding).catch(
        (e) => console.error('Failed to fetch rooms after card select', e)
      );
    }
  }

  onTabChange(index: number) {
    const mapping: Record<number, 'Parter' | 'Etaj 1' | 'Etaj 2'> = {
      0: 'Parter',
      1: 'Etaj 1',
      2: 'Etaj 2',
    };
    this.activeFloor = mapping[index] || 'Parter';

    if (this.selectedBuilding) {
      this.fetchRooms(this.activeFloor, this.selectedBuilding).catch((e) =>
        console.error('Failed to fetch rooms after tab change', e)
      );
    }
  }

  selectRoom(room: {
    roomId: number;
    seatCount: number;
    name: string;
    floorName: string;
  }) {
    this.selectedCardFloor = room.floorName as 'Parter' | 'Etaj 1' | 'Etaj 2';
    this.selectedCardNumber = room.roomId;
    console.log('Room selected', room);
    // emit selected room id to parent
    this.roomSelected.emit(room.roomId);
  }
  @Output() roomSelected = new EventEmitter<number>();

  async fetchRooms(floor: string, building: string): Promise<void> {
    const base = 'http://localhost:8080/rooms/roomByFloorAndBuilding';
    const url = `${base}?floorName=${encodeURIComponent(
      floor
    )}&buildingName=${encodeURIComponent(building)}`;
    console.log('Fetching rooms GET', url);
    try {
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) {
        const text = await res.text();
        console.error('Non-OK response fetching rooms', res.status, text);
        return;
      }
      const data = await res.json();
      console.log('Rooms response:', data);

      const arr = Array.isArray(data) ? data : [data];

      this.roomsByFloor[floor] = arr;

      this.rooms = arr;

      this.fetchedForFloor[floor] = true;
    } catch (err) {
      console.error('Error fetching rooms', err);

      this.fetchedForFloor[floor] = true;
      throw err;
    }
  }

  constructor() {}
}
