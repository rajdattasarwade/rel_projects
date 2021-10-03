import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAndAdvancesComponent } from './loan-and-advances.component';

describe('LoanAndAdvancesComponent', () => {
  let component: LoanAndAdvancesComponent;
  let fixture: ComponentFixture<LoanAndAdvancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAndAdvancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAndAdvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
