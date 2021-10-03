import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AviationTrainingReimbursementComponent } from './aviation-training-reimbursement.component';

describe('AviationTrainingReimbursementComponent', () => {
  let component: AviationTrainingReimbursementComponent;
  let fixture: ComponentFixture<AviationTrainingReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AviationTrainingReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AviationTrainingReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
