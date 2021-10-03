import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignShiftModalComponent } from './assign-shift-modal.component';

describe('AssignShiftModalComponent', () => {
  let component: AssignShiftModalComponent;
  let fixture: ComponentFixture<AssignShiftModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignShiftModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignShiftModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
