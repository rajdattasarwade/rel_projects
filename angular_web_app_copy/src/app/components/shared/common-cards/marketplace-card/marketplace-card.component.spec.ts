import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceCardComponent } from './marketplace-card.component';

describe('MarketplaceCardComponent', () => {
  let component: MarketplaceCardComponent;
  let fixture: ComponentFixture<MarketplaceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
