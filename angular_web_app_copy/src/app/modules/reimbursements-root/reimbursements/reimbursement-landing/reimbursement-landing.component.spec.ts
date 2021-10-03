import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementLandingComponent } from './reimbursement-landing.component';

describe('ReimbursementLandingComponent', () => {
  let component: ReimbursementLandingComponent;
  let fixture: ComponentFixture<ReimbursementLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
