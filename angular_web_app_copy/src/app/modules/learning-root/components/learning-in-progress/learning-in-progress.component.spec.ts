import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningInProgressComponent } from './learning-in-progress.component';

describe('LearningInProgressComponent', () => {
  let component: LearningInProgressComponent;
  let fixture: ComponentFixture<LearningInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningInProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
