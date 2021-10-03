import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCentersInfoModalComponent } from './medical-centers-info-modal.component';

describe('MedicalCentersInfoModalComponent', () => {
  let component: MedicalCentersInfoModalComponent;
  let fixture: ComponentFixture<MedicalCentersInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalCentersInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalCentersInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
