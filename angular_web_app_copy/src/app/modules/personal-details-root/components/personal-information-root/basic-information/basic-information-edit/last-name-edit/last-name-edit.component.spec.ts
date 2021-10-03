import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastNameEditComponent } from './last-name-edit.component';

describe('LastNameEditComponent', () => {
  let component: LastNameEditComponent;
  let fixture: ComponentFixture<LastNameEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastNameEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastNameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
