import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPaySummaryComponent } from './total-pay-summary.component';

describe('TotalPaySummaryComponent', () => {
  let component: TotalPaySummaryComponent;
  let fixture: ComponentFixture<TotalPaySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPaySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPaySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
