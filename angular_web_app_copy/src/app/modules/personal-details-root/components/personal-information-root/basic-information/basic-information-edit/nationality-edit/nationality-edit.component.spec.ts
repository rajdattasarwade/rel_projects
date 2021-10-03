import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalityEditComponent } from './nationality-edit.component';

describe('NationalityEditComponent', () => {
  let component: NationalityEditComponent;
  let fixture: ComponentFixture<NationalityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
