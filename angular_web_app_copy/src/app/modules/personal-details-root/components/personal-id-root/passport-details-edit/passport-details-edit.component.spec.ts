import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportDetailsEditComponent } from './passport-details-edit.component';

describe('PassportDetailsEditComponent', () => {
  let component: PassportDetailsEditComponent;
  let fixture: ComponentFixture<PassportDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassportDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
