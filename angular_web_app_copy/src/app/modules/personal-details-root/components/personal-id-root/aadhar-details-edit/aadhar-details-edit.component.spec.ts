import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharDetailsEditComponent } from './aadhar-details-edit.component';

describe('AadharDetailsEditComponent', () => {
  let component: AadharDetailsEditComponent;
  let fixture: ComponentFixture<AadharDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AadharDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AadharDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
