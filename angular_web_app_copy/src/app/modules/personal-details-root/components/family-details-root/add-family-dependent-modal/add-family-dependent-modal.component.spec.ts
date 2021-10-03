import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamilyDependentModalComponent } from './add-family-dependent-modal.component';

describe('AddFamilyDependentModalComponent', () => {
  let component: AddFamilyDependentModalComponent;
  let fixture: ComponentFixture<AddFamilyDependentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFamilyDependentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFamilyDependentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
