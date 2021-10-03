import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAvailedPopupComponent } from './leave-availed-credited-popup.component';

describe('LeaveAvailedPopupComponent', () => {
  let component: LeaveAvailedPopupComponent;
  let fixture: ComponentFixture<LeaveAvailedPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveAvailedPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveAvailedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
