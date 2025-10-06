import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { OfficeSeatsComponent } from './pages/office-seats/office-seats.component';
import { TrafficInfoComponent } from './pages/traffic-info/traffic-info.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { ConferenceRoomsComponent } from './pages/conference-rooms/conference-rooms.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: 'office-seats', component: OfficeSeatsComponent },
  { path: 'traffic-info', component: TrafficInfoComponent },
  { path: 'conference-rooms', component: ConferenceRoomsComponent },
  { path: 'weather', component: WeatherComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
