import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherReimbursementComponent } from './other-reimbursement.component';

describe('OtherReimbursementComponent', () => {
  let component: OtherReimbursementComponent;
  let fixture: ComponentFixture<OtherReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
