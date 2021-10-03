import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperCreateDeductionModalComponent } from './super-create-deduction-modal.component';

describe('SuperCreateDeductionModalComponent', () => {
  let component: SuperCreateDeductionModalComponent;
  let fixture: ComponentFixture<SuperCreateDeductionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperCreateDeductionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperCreateDeductionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
