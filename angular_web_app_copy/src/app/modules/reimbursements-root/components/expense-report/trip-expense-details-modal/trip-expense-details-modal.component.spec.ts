import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripExpenseDetailsModalComponent } from './trip-expense-details-modal.component';

describe('TripExpenseDetailsModalComponent', () => {
  let component: TripExpenseDetailsModalComponent;
  let fixture: ComponentFixture<TripExpenseDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripExpenseDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripExpenseDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
