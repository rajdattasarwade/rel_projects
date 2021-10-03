import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentDetailsPopupComponent } from './installment-details-popup.component';

describe('InstallmentDetailsPopupComponent', () => {
  let component: InstallmentDetailsPopupComponent;
  let fixture: ComponentFixture<InstallmentDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallmentDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
