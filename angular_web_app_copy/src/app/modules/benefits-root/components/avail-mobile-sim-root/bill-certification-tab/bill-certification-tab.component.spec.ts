import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCertificationTabComponent } from './bill-certification-tab.component';

describe('BillCertificationTabComponent', () => {
  let component: BillCertificationTabComponent;
  let fixture: ComponentFixture<BillCertificationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillCertificationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCertificationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
