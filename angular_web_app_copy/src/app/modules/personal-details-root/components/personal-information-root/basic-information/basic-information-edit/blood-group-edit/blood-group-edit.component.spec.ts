import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodGroupEditComponent } from './blood-group-edit.component';

describe('BloodGroupEditComponent', () => {
  let component: BloodGroupEditComponent;
  let fixture: ComponentFixture<BloodGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
