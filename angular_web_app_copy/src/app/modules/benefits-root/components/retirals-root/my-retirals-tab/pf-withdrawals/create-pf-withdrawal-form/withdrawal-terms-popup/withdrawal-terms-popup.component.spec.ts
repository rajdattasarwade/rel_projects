import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalTermsPopupComponent } from './withdrawal-terms-popup.component';

describe('WithdrawalTermsPopupComponent', () => {
  let component: WithdrawalTermsPopupComponent;
  let fixture: ComponentFixture<WithdrawalTermsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalTermsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalTermsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
