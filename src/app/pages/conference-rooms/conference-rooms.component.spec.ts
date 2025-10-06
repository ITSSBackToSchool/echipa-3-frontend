import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceRoomsComponent } from './conference-rooms.component';

describe('ConferenceRoomsComponent', () => {
  let component: ConferenceRoomsComponent;
  let fixture: ComponentFixture<ConferenceRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConferenceRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
