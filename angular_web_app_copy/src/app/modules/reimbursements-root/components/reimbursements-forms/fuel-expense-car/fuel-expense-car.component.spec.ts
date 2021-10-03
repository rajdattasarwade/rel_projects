import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelExpenseCarComponent } from './fuel-expense-car.component';

describe('FuelExpenseCarComponent', () => {
  let component: FuelExpenseCarComponent;
  let fixture: ComponentFixture<FuelExpenseCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelExpenseCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelExpenseCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
