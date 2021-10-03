import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSubordinateModalComponent } from './remove-subordinate-modal.component';

describe('RemoveSubordinateModalComponent', () => {
  let component: RemoveSubordinateModalComponent;
  let fixture: ComponentFixture<RemoveSubordinateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveSubordinateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveSubordinateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
