import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLeftComponent } from './payroll-reminder.component';

describe('PayrollReminderComponent', () => {
  let component: PayrollReminderComponent;
  let fixture: ComponentFixture<PayrollReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollReminderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
