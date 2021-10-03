import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferDetailsPopupComponent } from './internal-transfer-details-popup.component';

describe('InternalTransferDetailsPopupComponent', () => {
  let component: InternalTransferDetailsPopupComponent;
  let fixture: ComponentFixture<InternalTransferDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
