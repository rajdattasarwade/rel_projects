import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollTaxSummaryComponent } from './payroll-tax-summary.component';

describe('PayrolTaxSummaryComponent', () => {
  let component: PayrollTaxSummaryComponent;
  let fixture: ComponentFixture<PayrollTaxSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollTaxSummaryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollTaxSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
