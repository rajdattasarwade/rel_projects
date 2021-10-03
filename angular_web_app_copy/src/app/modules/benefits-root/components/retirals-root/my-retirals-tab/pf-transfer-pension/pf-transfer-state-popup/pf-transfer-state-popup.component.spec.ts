import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfTransferStatePopupComponent } from './pf-transfer-state-popup.component';

describe('PfTransferStatePopupComponent', () => {
  let component: PfTransferStatePopupComponent;
  let fixture: ComponentFixture<PfTransferStatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfTransferStatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfTransferStatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
