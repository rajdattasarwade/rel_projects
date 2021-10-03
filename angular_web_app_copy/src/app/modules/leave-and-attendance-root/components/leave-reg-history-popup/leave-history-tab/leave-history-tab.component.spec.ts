import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHistoryTabComponent } from './leave-history-tab.component';

describe('LeaveHistoryTabComponent', () => {
  let component: LeaveHistoryTabComponent;
  let fixture: ComponentFixture<LeaveHistoryTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveHistoryTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveHistoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
