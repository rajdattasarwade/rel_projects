import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollLoansComponent } from './payroll-loans.component';

describe('PayrollReminderComponent', () => {
  let component: PayrollLoansComponent;
  let fixture: ComponentFixture<PayrollLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollLoansComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
