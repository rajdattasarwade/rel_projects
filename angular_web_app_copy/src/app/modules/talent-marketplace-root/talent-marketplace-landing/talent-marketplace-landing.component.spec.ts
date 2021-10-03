import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentMarketplaceLandingComponent } from './talent-marketplace-landing.component';

describe('TalentMarketplaceLandingComponent', () => {
  let component: TalentMarketplaceLandingComponent;
  let fixture: ComponentFixture<TalentMarketplaceLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentMarketplaceLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentMarketplaceLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
