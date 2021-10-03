import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsLandingComponent } from './benefits-landing.component';

describe('BenefitsLandingComponent', () => {
  let component: BenefitsLandingComponent;
  let fixture: ComponentFixture<BenefitsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
