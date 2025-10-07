import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRoutePanelComponent } from './plan-route-panel.component';

describe('PlanRoutePanelComponent', () => {
  let component: PlanRoutePanelComponent;
  let fixture: ComponentFixture<PlanRoutePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanRoutePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanRoutePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
