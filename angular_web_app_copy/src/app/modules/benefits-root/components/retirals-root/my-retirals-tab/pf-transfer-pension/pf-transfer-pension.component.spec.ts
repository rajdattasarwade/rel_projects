import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfTransferPensionComponent } from './pf-transfer-pension.component';

describe('PfTransferPensionComponent', () => {
  let component: PfTransferPensionComponent;
  let fixture: ComponentFixture<PfTransferPensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfTransferPensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfTransferPensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
