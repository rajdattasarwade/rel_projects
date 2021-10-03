import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeedComponent } from './all-feed.component';

describe('AllFeedComponent', () => {
  let component: AllFeedComponent;
  let fixture: ComponentFixture<AllFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
