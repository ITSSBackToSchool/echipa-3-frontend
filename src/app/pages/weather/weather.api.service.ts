import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    // This should be an HTTP GET, not a router navigation
    return this.http.get('/api/weather');
  }
}
