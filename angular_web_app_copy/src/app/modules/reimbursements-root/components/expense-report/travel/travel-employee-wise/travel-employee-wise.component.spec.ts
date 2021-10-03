import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelEmployeeWiseComponent } from './travel-employee-wise.component';

describe('TravelEmployeeWiseComponent', () => {
  let component: TravelEmployeeWiseComponent;
  let fixture: ComponentFixture<TravelEmployeeWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelEmployeeWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelEmployeeWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
