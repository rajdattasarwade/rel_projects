import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseReportManagerComponent } from './expense-report-manager.component';

describe('ExpenseReportManagerComponent', () => {
  let component: ExpenseReportManagerComponent;
  let fixture: ComponentFixture<ExpenseReportManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseReportManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseReportManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
