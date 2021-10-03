import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedGigsLandingComponent } from './recommended-gigs-landing.component';

describe('RecommendedGigsLandingComponent', () => {
  let component: RecommendedGigsLandingComponent;
  let fixture: ComponentFixture<RecommendedGigsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedGigsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedGigsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
