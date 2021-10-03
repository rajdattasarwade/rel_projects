import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditDependentsModalComponent } from './view-edit-dependents-modal.component';

describe('ViewEditDependentsModalComponent', () => {
  let component: ViewEditDependentsModalComponent;
  let fixture: ComponentFixture<ViewEditDependentsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditDependentsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditDependentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
