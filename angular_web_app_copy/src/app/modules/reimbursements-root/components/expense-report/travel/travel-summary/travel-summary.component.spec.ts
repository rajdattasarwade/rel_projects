import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSummaryComponent } from './travel-summary.component';

describe('TravelSummaryComponent', () => {
  let component: TravelSummaryComponent;
  let fixture: ComponentFixture<TravelSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
