import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelExpenseTwoWheelerComponent } from './fuel-expense-two-wheeler.component';

describe('FuelExpenseTwoWheelerComponent', () => {
  let component: FuelExpenseTwoWheelerComponent;
  let fixture: ComponentFixture<FuelExpenseTwoWheelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelExpenseTwoWheelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelExpenseTwoWheelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
