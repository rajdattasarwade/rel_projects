import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDeductedDateModalComponent } from './salary-deducted-date-modal.component';

describe('SalaryDeductedDateModalComponent', () => {
  let component: SalaryDeductedDateModalComponent;
  let fixture: ComponentFixture<SalaryDeductedDateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryDeductedDateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryDeductedDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
