import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingLicenseEditComponent } from './driving-license-edit.component';

describe('DrivingLicenseEditComponent', () => {
  let component: DrivingLicenseEditComponent;
  let fixture: ComponentFixture<DrivingLicenseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivingLicenseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivingLicenseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
