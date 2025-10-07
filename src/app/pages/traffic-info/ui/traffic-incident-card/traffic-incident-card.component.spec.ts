import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficIncidentCardComponent } from './traffic-incident-card.component';

describe('TrafficIncidentCardComponent', () => {
  let component: TrafficIncidentCardComponent;
  let fixture: ComponentFixture<TrafficIncidentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficIncidentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrafficIncidentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
