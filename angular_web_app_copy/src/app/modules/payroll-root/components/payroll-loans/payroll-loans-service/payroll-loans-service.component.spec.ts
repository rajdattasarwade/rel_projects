import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollLoanServiceComponent } from './payroll-loans-service.component';

describe('PayrollLoanServiceComponent', () => {
  let component: PayrollLoanServiceComponent;
  let fixture: ComponentFixture<PayrollLoanServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollLoanServiceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollLoanServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
