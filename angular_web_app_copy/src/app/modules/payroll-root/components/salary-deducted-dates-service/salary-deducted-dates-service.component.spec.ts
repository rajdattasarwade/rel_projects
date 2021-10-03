import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDeductedDatesServiceComponent } from './salary-deducted-dates-service.component';

describe('SalaryDeductedDatesServiceComponent', () => {
  let component: SalaryDeductedDatesServiceComponent;
  let fixture: ComponentFixture<SalaryDeductedDatesServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryDeductedDatesServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryDeductedDatesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
