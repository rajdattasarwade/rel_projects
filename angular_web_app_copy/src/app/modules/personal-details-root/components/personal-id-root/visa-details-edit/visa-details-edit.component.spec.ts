import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaDetailsEditComponent } from './visa-details-edit.component';

describe('VisaDetailsEditComponent', () => {
  let component: VisaDetailsEditComponent;
  let fixture: ComponentFixture<VisaDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
