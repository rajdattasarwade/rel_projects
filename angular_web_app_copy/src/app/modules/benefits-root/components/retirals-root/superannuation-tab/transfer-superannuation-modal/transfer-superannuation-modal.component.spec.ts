import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferSuperannuationModalComponent } from './transfer-superannuation-modal.component';

describe('TransferSuperannuationModalComponent', () => {
  let component: TransferSuperannuationModalComponent;
  let fixture: ComponentFixture<TransferSuperannuationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferSuperannuationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferSuperannuationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
