import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCreditedPopupComponent } from './leave-credited-popup.component';

describe('LeaveCreditedPopupComponent', () => {
  let component: LeaveCreditedPopupComponent;
  let fixture: ComponentFixture<LeaveCreditedPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveCreditedPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveCreditedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
