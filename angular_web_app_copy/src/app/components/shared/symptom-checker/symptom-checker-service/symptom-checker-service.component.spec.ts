import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomCheckerServiceComponent } from './symptom-checker-service.component';

describe('SymptomCheckerServiceComponent', () => {
  let component: SymptomCheckerServiceComponent;
  let fixture: ComponentFixture<SymptomCheckerServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomCheckerServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomCheckerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
