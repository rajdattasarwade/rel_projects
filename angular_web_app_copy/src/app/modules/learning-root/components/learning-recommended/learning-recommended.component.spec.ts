import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningRecommendedComponent } from './learning-recommended.component';

describe('LearningRecommendedComponent', () => {
  let component: LearningRecommendedComponent;
  let fixture: ComponentFixture<LearningRecommendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningRecommendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
