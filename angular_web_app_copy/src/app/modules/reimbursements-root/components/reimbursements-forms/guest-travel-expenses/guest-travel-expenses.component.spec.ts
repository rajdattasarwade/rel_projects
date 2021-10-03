import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestTravelExpensesComponent } from './guest-travel-expenses.component';

describe('GuestTravelExpensesComponent', () => {
  let component: GuestTravelExpensesComponent;
  let fixture: ComponentFixture<GuestTravelExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestTravelExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestTravelExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
