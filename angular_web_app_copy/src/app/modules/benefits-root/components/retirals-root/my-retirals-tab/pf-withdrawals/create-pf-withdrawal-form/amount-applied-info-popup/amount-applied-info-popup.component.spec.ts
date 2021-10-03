import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountAppliedInfoPopupComponent } from './amount-applied-info-popup.component';

describe('AmountAppliedInfoPopupComponent', () => {
  let component: AmountAppliedInfoPopupComponent;
  let fixture: ComponentFixture<AmountAppliedInfoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountAppliedInfoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountAppliedInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
