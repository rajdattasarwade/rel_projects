import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreEmpMedicalComponent } from './pre-emp-medical.component';

describe('PreEmpMedicalComponent', () => {
  let component: PreEmpMedicalComponent;
  let fixture: ComponentFixture<PreEmpMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreEmpMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreEmpMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
