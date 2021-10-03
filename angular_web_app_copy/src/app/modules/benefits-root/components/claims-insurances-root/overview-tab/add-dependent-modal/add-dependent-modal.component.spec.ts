import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDependentModalComponent } from './add-dependent-modal.component';

describe('AddDependentModalComponent', () => {
  let component: AddDependentModalComponent;
  let fixture: ComponentFixture<AddDependentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDependentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDependentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
