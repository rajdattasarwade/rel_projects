import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementHistoryComponent } from './reimbursement-history.component';

describe('ReimbursementHistoryComponent', () => {
  let component: ReimbursementHistoryComponent;
  let fixture: ComponentFixture<ReimbursementHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
