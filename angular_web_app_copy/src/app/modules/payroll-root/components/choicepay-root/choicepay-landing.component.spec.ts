import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePayLandingComponent } from './choicepay-landing.component';

describe('ChoicePayLandingComponent', () => {
  let component: ChoicePayLandingComponent;
  let fixture: ComponentFixture<ChoicePayLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChoicePayLandingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicePayLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
