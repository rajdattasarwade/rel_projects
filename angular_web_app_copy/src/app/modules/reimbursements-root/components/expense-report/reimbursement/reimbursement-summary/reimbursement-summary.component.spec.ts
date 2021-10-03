import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementSummaryComponent } from './reimbursement-summary.component';

describe('ReimbursementSummaryComponent', () => {
  let component: ReimbursementSummaryComponent;
  let fixture: ComponentFixture<ReimbursementSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
