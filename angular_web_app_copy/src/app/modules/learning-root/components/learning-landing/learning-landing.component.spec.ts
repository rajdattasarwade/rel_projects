import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningLandingComponent } from './learning-landing.component';

describe('LearningLandingComponent', () => {
  let component: LearningLandingComponent;
  let fixture: ComponentFixture<LearningLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
