import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftFilterModalComponent } from './shift-filter-modal.component';

describe('ShiftFilterModalComponent', () => {
  let component: ShiftFilterModalComponent;
  let fixture: ComponentFixture<ShiftFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
