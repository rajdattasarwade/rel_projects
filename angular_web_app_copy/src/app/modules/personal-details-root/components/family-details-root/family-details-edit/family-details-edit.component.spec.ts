import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDetailsEditComponent } from './family-details-edit.component';

describe('FamilyDetailsEditComponent', () => {
  let component: FamilyDetailsEditComponent;
  let fixture: ComponentFixture<FamilyDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
