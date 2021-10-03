import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveReconciliationComponent } from './leave-reconciliation.component';

describe('LeaveReconciliationComponent', () => {
  let component: LeaveReconciliationComponent;
  let fixture: ComponentFixture<LeaveReconciliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveReconciliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
