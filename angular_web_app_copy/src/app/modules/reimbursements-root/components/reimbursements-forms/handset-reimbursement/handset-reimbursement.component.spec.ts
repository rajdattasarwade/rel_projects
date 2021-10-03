import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandsetReimbursementComponent } from './handset-reimbursement.component';

describe('HandsetReimbursementComponent', () => {
  let component: HandsetReimbursementComponent;
  let fixture: ComponentFixture<HandsetReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandsetReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandsetReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
