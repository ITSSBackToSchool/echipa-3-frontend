import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarConferenceComponent } from './calendar-conference.component';

describe('CalendarConferenceComponent', () => {
  let component: CalendarConferenceComponent;
  let fixture: ComponentFixture<CalendarConferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarConferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
