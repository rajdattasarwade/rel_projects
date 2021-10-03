import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInfoModalComponent } from './address-info-modal.component';

describe('AddressInfoModalComponent', () => {
  let component: AddressInfoModalComponent;
  let fixture: ComponentFixture<AddressInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
