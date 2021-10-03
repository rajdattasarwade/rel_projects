import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerialMedicalAllowanceComponent } from './managerial-medical-allowance.component';

describe('ManagerialMedicalAllowanceComponent', () => {
  let component: ManagerialMedicalAllowanceComponent;
  let fixture: ComponentFixture<ManagerialMedicalAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerialMedicalAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerialMedicalAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
