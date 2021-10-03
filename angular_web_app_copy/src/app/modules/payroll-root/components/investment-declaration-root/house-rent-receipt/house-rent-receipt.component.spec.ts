import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRentReceiptComponent } from './house-rent-receipt.component';

describe('HouseRentReceiptComponent', () => {
  let component: HouseRentReceiptComponent;
  let fixture: ComponentFixture<HouseRentReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseRentReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRentReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
