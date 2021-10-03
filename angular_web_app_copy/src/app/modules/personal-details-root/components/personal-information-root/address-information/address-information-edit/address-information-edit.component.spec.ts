import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInformationEditComponent } from './address-information-edit.component';

describe('AddressInformationEditComponent', () => {
  let component: AddressInformationEditComponent;
  let fixture: ComponentFixture<AddressInformationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressInformationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInformationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
