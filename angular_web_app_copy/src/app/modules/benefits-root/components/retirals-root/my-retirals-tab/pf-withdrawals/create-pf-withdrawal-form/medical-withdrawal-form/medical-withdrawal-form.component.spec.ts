import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalWithdrawalFormComponent } from './medical-withdrawal-form.component';

describe('MedicalWithdrawalFormComponent', () => {
  let component: MedicalWithdrawalFormComponent;
  let fixture: ComponentFixture<MedicalWithdrawalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalWithdrawalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalWithdrawalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
