import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLeasedVehicleComponent } from './company-leased-vehicle.component';

describe('CompanyLeasedVehicleComponent', () => {
  let component: CompanyLeasedVehicleComponent;
  let fixture: ComponentFixture<CompanyLeasedVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLeasedVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLeasedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
