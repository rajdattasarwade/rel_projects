import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalActionPopupComponent } from './cal-action-popup.component';

describe('CalActionPopupComponent', () => {
  let component: CalActionPopupComponent;
  let fixture: ComponentFixture<CalActionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalActionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalActionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
