import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOfBirthEditComponent } from './place-of-birth-edit.component';

describe('PlaceOfBirthEditComponent', () => {
  let component: PlaceOfBirthEditComponent;
  let fixture: ComponentFixture<PlaceOfBirthEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceOfBirthEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOfBirthEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
