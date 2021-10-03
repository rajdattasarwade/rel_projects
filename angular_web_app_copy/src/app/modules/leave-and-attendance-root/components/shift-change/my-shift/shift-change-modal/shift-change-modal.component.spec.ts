import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftChangeModalComponent } from './shift-change-modal.component';

describe('ShiftChangeModalComponent', () => {
  let component: ShiftChangeModalComponent;
  let fixture: ComponentFixture<ShiftChangeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftChangeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftChangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
