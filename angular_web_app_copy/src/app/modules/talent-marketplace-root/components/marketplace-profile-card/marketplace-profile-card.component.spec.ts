import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceProfileCardComponent } from './marketplace-profile-card.component';

describe('MarketplaceProfileCardComponent', () => {
  let component: MarketplaceProfileCardComponent;
  let fixture: ComponentFixture<MarketplaceProfileCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceProfileCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
