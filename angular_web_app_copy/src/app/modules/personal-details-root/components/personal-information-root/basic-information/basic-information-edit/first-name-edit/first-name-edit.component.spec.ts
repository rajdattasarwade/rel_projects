import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstNameEditComponent } from './first-name-edit.component';

describe('FirstNameEditComponent', () => {
  let component: FirstNameEditComponent;
  let fixture: ComponentFixture<FirstNameEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstNameEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstNameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
