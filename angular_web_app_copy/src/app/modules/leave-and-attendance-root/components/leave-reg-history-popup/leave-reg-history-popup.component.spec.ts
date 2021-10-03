import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRegHistoryPopupComponent } from './leave-reg-history-popup.component';

describe('LeaveRegHistoryPopupComponent', () => {
  let component: LeaveRegHistoryPopupComponent;
  let fixture: ComponentFixture<LeaveRegHistoryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveRegHistoryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRegHistoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
