import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsDeductionModalComponent } from './nps-deduction-modal.component';

describe('NpsDeductionModalComponent', () => {
  let component: NpsDeductionModalComponent;
  let fixture: ComponentFixture<NpsDeductionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpsDeductionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpsDeductionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
