import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelativeModalComponent } from './add-relative-modal.component';

describe('AddRelativeModalComponent', () => {
  let component: AddRelativeModalComponent;
  let fixture: ComponentFixture<AddRelativeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRelativeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRelativeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
