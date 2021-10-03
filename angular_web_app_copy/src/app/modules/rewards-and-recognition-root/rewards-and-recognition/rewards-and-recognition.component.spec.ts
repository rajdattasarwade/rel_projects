import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsAndRecognitionComponent } from './rewards-and-recognition.component';

describe('RewardsAndRecognitionComponent', () => {
  let component: RewardsAndRecognitionComponent;
  let fixture: ComponentFixture<RewardsAndRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsAndRecognitionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsAndRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
