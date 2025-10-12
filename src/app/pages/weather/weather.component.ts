import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherApiService } from './weather.api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [CommonModule, HttpClientModule]
})
export class WeatherComponent implements OnInit {
  private api = inject(WeatherApiService);
  data: any;

  ngOnInit(): void {
    this.api.getWeather().subscribe(res => this.data = res);
  }
}
