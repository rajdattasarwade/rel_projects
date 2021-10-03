import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimInsuranceInfoComponent } from './claim-insurance-info.component';

describe('ClaimInsuranceInfoComponent', () => {
  let component: ClaimInsuranceInfoComponent;
  let fixture: ComponentFixture<ClaimInsuranceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimInsuranceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimInsuranceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
