import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputationFoodComponent } from './deputation-food.component';

describe('DeputationFoodComponent', () => {
  let component: DeputationFoodComponent;
  let fixture: ComponentFixture<DeputationFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputationFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputationFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
