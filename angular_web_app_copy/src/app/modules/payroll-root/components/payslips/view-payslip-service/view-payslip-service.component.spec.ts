import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPayslipServiceComponent } from './view-payslip-service.component';

describe('ViewPayslipServiceComponent', () => {
  let component: ViewPayslipServiceComponent;
  let fixture: ComponentFixture<ViewPayslipServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPayslipServiceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPayslipServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
