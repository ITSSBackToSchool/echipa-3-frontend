import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TrafficService, DirectionsResponse, IncidentsGeoJSON } from './traffic.service';

type IncidentVM = {
  type: 'Congestion' | 'Construction' | string;
  title: string;
  startTime?: string;
  lat?: number;
  lon?: number;
  severity?: number;
};

@Component({
  selector: 'app-traffic-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-info.component.html',
  styleUrls: ['./traffic-info.component.scss'],
})
export class TrafficInfoComponent implements OnInit, OnDestroy {
  // UI state
  loading = false;
  error?: string;

  // plan card
  myLocationText = 'My Location';
  currentHourText = '';

  // numeric coords (pt. calc distanță)
  myLat: number | null = null;
  myLon: number | null = null;

  // summary strip
  durationText = '--';
  distanceText = '--';

  // incidents
  incidents: IncidentVM[] = [];

  private subs: Subscription[] = [];

  constructor(private api: TrafficService) {}

  ngOnInit(): void {
    this.currentHourText = this.formatNow();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onSearch(): void {
    this.loading = true;
    this.error = undefined;

    this.getGeoLocation()
      .then(({ lat, lon }) => {
        this.myLat = lat;
        this.myLon = lon;
        const start = `${lat},${lon}`;
        this.myLocationText = start;

        const s1 = this.api.getDirections(start, true, 'car')
          .subscribe({
            next: (res) => this.applyDirections(res),
            error: (err) => this.error = String(err),
          });

        const s2 = this.api.getIncidents(start)
          .subscribe({
            next: (res) => this.applyIncidents(res),
            error: (err) => this.error = String(err),
            complete: () => this.loading = false,
          });

        this.subs.push(s1, s2);
      })
      .catch(err => {
        this.error = String(err);
        this.loading = false;
      });
  }

  // ---------- helpers ----------

  private applyDirections(res: DirectionsResponse) {
    const sum = res?.routes?.[0]?.summary;
    if (!sum) return;
    this.durationText = this.formatMinutes(sum.travelTimeInSeconds || 0);
    this.distanceText = this.formatKm(sum.lengthInMeters || 0);
  }

  private applyIncidents(res: IncidentsGeoJSON) {
    const list: IncidentVM[] = [];

    (res.features || []).forEach(f => {
      const p = f.properties || {};
      const g = f.geometry;
      const coords = (g?.coordinates as [number, number] | undefined);

      const title = (p.title && p.title.trim().length)
        ? p.title!.trim()
        : (p.description || 'Traffic incident');

      list.push({
        type: (p.incidentType as any) || 'Incident',
        title,
        startTime: p.startTime,
        lat: coords ? coords[1] : undefined, // [lon, lat]
        lon: coords ? coords[0] : undefined,
        severity: p.severity,
      });
    });

    // filtrează ultimele 2 ore
    const now = new Date();
    const recent = list.filter(it => {
      if (!it.startTime) return false;
      const t = new Date(it.startTime);
      const diffMin = Math.floor((now.getTime() - t.getTime()) / 60000);
      return diffMin >= 0 && diffMin <= 120;
    });

    // ordonează după cele mai recente
    recent.sort((a, b) => {
      const ta = a.startTime ? new Date(a.startTime).getTime() : 0;
      const tb = b.startTime ? new Date(b.startTime).getTime() : 0;
      return tb - ta;
    });

    this.incidents = recent;
  }

  private getGeoLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        return resolve({ lat: 44.4325, lon: 26.1039 });
      }
      const timeout = 6000;
      navigator.geolocation.getCurrentPosition(
        pos => {
          let lat = pos.coords.latitude;
          let lon = pos.coords.longitude;

          // fallback dacă emu oferă Googleplex
          const near = (a: number, b: number, eps = 0.0008) => Math.abs(a - b) < eps;
          if (near(lat, 37.4219983) && near(lon, -122.084)) { lat = 44.4325; lon = 26.1039; }

          resolve({ lat, lon });
        },
        _err => resolve({ lat: 44.4325, lon: 26.1039 }),
        { enableHighAccuracy: true, timeout, maximumAge: 10_000 }
      );
    });
  }

  // formatting
  private formatNow(): string {
    const d = new Date();
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }
  private formatMinutes(secs: number): string {
    return `${Math.round(secs / 60)} min`;
  }
  private formatKm(meters: number): string {
    const km = meters / 1000;
    return km >= 10 ? `${km.toFixed(0)} km` : `${km.toFixed(1)} km`;
  }

  minutesAgo(iso?: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    const mins = Math.max(0, Math.floor((Date.now() - d.getTime()) / 60000));
    return `Reported ${mins} min ago`;
  }

  distanceAhead(myLat: number, myLon: number, lat?: number, lon?: number): string {
    if (lat == null || lon == null) return '';
    const km = this.haversine(myLat, myLon, lat, lon);
    return `${km >= 10 ? km.toFixed(0) : km.toFixed(1)} km ahead`;
  }

  private haversine(lat1:number, lon1:number, lat2:number, lon2:number): number {
    const R = 6371, toRad = (d:number)=>d*Math.PI/180;
    const dLat = toRad(lat2-lat1), dLon = toRad(lon2-lon1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
    return 2*R*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  iconSrcFor(type: string): string {
    return type === 'Construction'
      ? '/airline_stops_RoundedFill.svg'  // roadworks
      : '/warning_RoundedFill.svg';       // congestion (default)
  }
  iconAltFor(type: string): string {
    return type === 'Construction' ? 'Roadworks' : 'Warning';
  }
}
