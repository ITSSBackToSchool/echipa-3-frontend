import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherApiService, WeatherResponse } from './weather.api.service';

type DayVM = {
  date: string;
  tmax: number;
  tmin: number;
  code: number;
  icon: string;
};

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [CommonModule, HttpClientModule]
})
export class WeatherComponent implements OnInit {
  private api = inject(WeatherApiService);

  data?: WeatherResponse;

  // current
  currentIcon = '/w-partly-cloudy.svg';
  currentLabel = '—';

  // daily
  days: DayVM[] = [];

  ngOnInit(): void {
    this.api.getWeather().subscribe(res => {
      this.data = res;

      // set current icon + label
      const code = res.current?.weather_code;
      this.currentIcon = this.iconFor(code);
      this.currentLabel = this.labelFor(code);

      // build days VM
      const d = res.daily;
      this.days = (d?.time || []).map((date, i) => ({
        date,
        tmax: d.temperature_2m_max[i],
        tmin: d.temperature_2m_min[i],
        code: d.weather_code[i],
        icon: this.iconFor(d.weather_code[i]),
      }));
    });
  }

  // === mapping WMO → icon path in /public ===
  iconFor(code?: number): string {
    if (code == null) return '/w-partly-cloudy.svg';
    if (code === 0) return '/w-clear-day.svg';                                   // clear
    if (code === 1 || code === 2) return '/w-partly-cloudy.svg';                 // mainly clear / partly cloudy
    if (code === 3) return '/w-cloudy.svg';                                      // overcast
    if (code === 45 || code === 48) return '/w-fog.svg';                         // fog
    if (code >= 51 && code <= 57) return '/w-drizzle.svg';                       // drizzle
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return '/w-rain.svg'; // rain & showers
    if (code >= 71 && code <= 77) return '/w-snow.svg';                          // snow / grains
    if (code === 85 || code === 86) return '/w-snow-showers.svg';                // snow showers
    if (code === 95) return '/w-thunder.svg';                                    // thunderstorm
    if (code === 96 || code === 99) return '/w-thunder-hail.svg';                // thunder + hail
    return '/w-partly-cloudy.svg';
  }

  labelFor(code?: number): string {
    if (code == null) return '—';
    if (code === 0) return 'Clear';
    if (code === 1) return 'Mainly clear';
    if (code === 2) return 'Partly cloudy';
    if (code === 3) return 'Cloudy';
    if (code === 45 || code === 48) return 'Fog';
    if (code >= 51 && code <= 57) return 'Drizzle';
    if (code >= 61 && code <= 67) return 'Rain';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 80 && code <= 82) return 'Rain showers';
    if (code === 85 || code === 86) return 'Snow showers';
    if (code === 95) return 'Thunderstorm';
    if (code === 96 || code === 99) return 'Thunderstorm with hail';
    return '—';
  }

  dayName(iso: string): string {
    return new Date(iso).toLocaleDateString(undefined, { weekday: 'short' }); // Mon, Tue…
  }
  round(n?: number): string {
    return n == null ? '—' : Math.round(n).toString();
  }
}
