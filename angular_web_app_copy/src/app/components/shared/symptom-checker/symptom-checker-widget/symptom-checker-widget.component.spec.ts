import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomCheckerWidgetComponent } from './symptom-checker-widget.component';

describe('SymptomCheckerWidgetComponent', () => {
  let component: SymptomCheckerWidgetComponent;
  let fixture: ComponentFixture<SymptomCheckerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomCheckerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomCheckerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
