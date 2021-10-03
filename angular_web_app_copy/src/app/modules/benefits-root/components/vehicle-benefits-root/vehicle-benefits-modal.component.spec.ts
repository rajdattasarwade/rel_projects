import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBenefitsModalComponent } from './vehicle-benefits-modal.component';

describe('VehicleBenefitsModalComponent', () => {
  let component: VehicleBenefitsModalComponent;
  let fixture: ComponentFixture<VehicleBenefitsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleBenefitsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleBenefitsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
