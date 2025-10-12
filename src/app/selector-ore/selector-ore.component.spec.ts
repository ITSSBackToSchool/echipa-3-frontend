import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorOreComponent } from './selector-ore.component';

describe('SelectorOreComponent', () => {
  let component: SelectorOreComponent;
  let fixture: ComponentFixture<SelectorOreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorOreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorOreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
