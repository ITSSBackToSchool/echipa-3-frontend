import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current_units?: {
    temperature_2m?: string;
    precipitation?: string;
    relative_humidity_2m?: string;
    surface_pressure?: string;
  };
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    surface_pressure: number;
    wind_speed_10m?: number;
    weather_code: number;       // ⬅️ important
  };
  daily: {
    time: string[];             // ISO dates
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];     // ⬅️ important
  };
}

@Injectable({ providedIn: 'root' })
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>('/api/weather');
  }
}
