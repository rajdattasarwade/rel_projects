import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningWeeklyGoalComponent } from './learning-weekly-goal.component';

describe('LearningWeeklyGoalComponent', () => {
  let component: LearningWeeklyGoalComponent;
  let fixture: ComponentFixture<LearningWeeklyGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningWeeklyGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningWeeklyGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
