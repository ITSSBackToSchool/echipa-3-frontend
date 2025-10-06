import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSeatsComponent } from './office-seats.component';

describe('OfficeSeatsComponent', () => {
  let component: OfficeSeatsComponent;
  let fixture: ComponentFixture<OfficeSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeSeatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
