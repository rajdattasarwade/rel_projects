import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAdvanceComponent } from './medical-advance.component';

describe('MedicalAdvanceComponent', () => {
  let component: MedicalAdvanceComponent;
  let fixture: ComponentFixture<MedicalAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
