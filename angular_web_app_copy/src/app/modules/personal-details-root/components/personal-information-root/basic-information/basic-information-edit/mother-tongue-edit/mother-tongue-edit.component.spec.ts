import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherTongueEditComponent } from './mother-tongue-edit.component';

describe('MotherTongueEditComponent', () => {
  let component: MotherTongueEditComponent;
  let fixture: ComponentFixture<MotherTongueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotherTongueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherTongueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
