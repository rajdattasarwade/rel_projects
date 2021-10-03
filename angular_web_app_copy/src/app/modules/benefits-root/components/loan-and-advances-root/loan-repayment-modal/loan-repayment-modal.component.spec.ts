import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepaymentModalComponent } from './loan-repayment-modal.component';

describe('LoanRepaymentModalComponent', () => {
  let component: LoanRepaymentModalComponent;
  let fixture: ComponentFixture<LoanRepaymentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRepaymentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRepaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
