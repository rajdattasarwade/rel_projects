import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDetailsRootComponent } from './address-details-root.component';

describe('AddressDetailsRootComponent', () => {
  let component: AddressDetailsRootComponent;
  let fixture: ComponentFixture<AddressDetailsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressDetailsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDetailsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
