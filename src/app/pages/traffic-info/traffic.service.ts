import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DirectionsResponse {
  routes: Array<{
    summary: {
      lengthInMeters: number;
      travelTimeInSeconds: number;
      trafficDelayInSeconds?: number;
      departureTime?: string;
      arrivalTime?: string;
    }
  }>;
}

export interface IncidentsGeoJSON {
  features: Array<{
    geometry?: { type: string; coordinates: [number, number] }; // [lon, lat]
    properties?: {
      incidentType?: 'Congestion' | 'Construction' | string;
      startTime?: string;   // ISO
      title?: string;
      description?: string;
      severity?: number;
    };
  }>;
}

@Injectable({ providedIn: 'root' })
export class TrafficService {
  private base = environment.apiBase;

  constructor(private http: HttpClient) {}

  getDirections(start: string, traffic = true, travelMode = 'car'): Observable<DirectionsResponse> {
    const params = new HttpParams()
      .set('start', start)
      .set('traffic', String(traffic))
      .set('travelMode', travelMode);
    return this.http.get<DirectionsResponse>(`${this.base}/directions`, { params });
  }

  getIncidents(startBbox: string): Observable<IncidentsGeoJSON> {
    const params = new HttpParams().set('startBbox', startBbox);
    return this.http.get<IncidentsGeoJSON>(`${this.base}/incidents`, { params });
  }
}
