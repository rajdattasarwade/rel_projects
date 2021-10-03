import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyLeasedVehicleModalComponent } from './company-leased-vehicle-modal-component';

describe('CompanyLeasedVehicleModalComponent', () => {
  let component: CompanyLeasedVehicleModalComponent;
  let fixture: ComponentFixture<CompanyLeasedVehicleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLeasedVehicleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLeasedVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
