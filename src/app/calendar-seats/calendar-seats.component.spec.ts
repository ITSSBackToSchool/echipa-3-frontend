import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSeatsComponent } from './calendar-seats.component';

describe('CalendarSeatsComponent', () => {
  let component: CalendarSeatsComponent;
  let fixture: ComponentFixture<CalendarSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarSeatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
