import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpfCreateDeductionModalComponent } from './vpf-create-deduction-modal.component';

describe('VpfCreateDeductionModalComponent', () => {
  let component: VpfCreateDeductionModalComponent;
  let fixture: ComponentFixture<VpfCreateDeductionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpfCreateDeductionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpfCreateDeductionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
