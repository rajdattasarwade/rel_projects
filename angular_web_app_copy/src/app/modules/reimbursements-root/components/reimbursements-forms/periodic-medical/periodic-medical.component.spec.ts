import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicMedicalComponent } from './periodic-medical.component';

describe('PeriodicMedicalComponent', () => {
  let component: PeriodicMedicalComponent;
  let fixture: ComponentFixture<PeriodicMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
