import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationAssistanceRequestComponent } from './education-assistance-request.component';

describe('EducationAssistanceRequestComponent', () => {
  let component: EducationAssistanceRequestComponent;
  let fixture: ComponentFixture<EducationAssistanceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationAssistanceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationAssistanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
