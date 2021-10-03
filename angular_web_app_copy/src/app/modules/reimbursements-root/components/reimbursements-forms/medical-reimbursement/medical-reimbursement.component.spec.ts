import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalReimbursementComponent } from './medical-reimbursement.component';

describe('MedicalReimbursementComponent', () => {
  let component: MedicalReimbursementComponent;
  let fixture: ComponentFixture<MedicalReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
