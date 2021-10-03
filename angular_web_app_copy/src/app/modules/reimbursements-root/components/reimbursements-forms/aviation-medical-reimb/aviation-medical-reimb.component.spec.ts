import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AviationMedicalReimbComponent } from './aviation-medical-reimb.component';

describe('AviationMedicalReimbComponent', () => {
  let component: AviationMedicalReimbComponent;
  let fixture: ComponentFixture<AviationMedicalReimbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AviationMedicalReimbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AviationMedicalReimbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
