import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFieldIncidentalExpenseComponent } from './daily-field-incidental-expense.component';

describe('DailyFieldIncidentalExpenseComponent', () => {
  let component: DailyFieldIncidentalExpenseComponent;
  let fixture: ComponentFixture<DailyFieldIncidentalExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyFieldIncidentalExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyFieldIncidentalExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
