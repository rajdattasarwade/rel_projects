import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentRepairSohoAllowanceComponent } from './accident-repair-soho-allowance.component';

describe('AccidentRepairSohoAllowanceComponent', () => {
  let component: AccidentRepairSohoAllowanceComponent;
  let fixture: ComponentFixture<AccidentRepairSohoAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentRepairSohoAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentRepairSohoAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
