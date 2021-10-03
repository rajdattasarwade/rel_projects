import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDetailsPopupComponent } from './leave-details-popup.component';

describe('LeaveDetailsPopupComponent', () => {
  let component: LeaveDetailsPopupComponent;
  let fixture: ComponentFixture<LeaveDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
