import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantDateEditComponent } from './important-date-edit.component';

describe('ImportantDateEditComponent', () => {
  let component: ImportantDateEditComponent;
  let fixture: ComponentFixture<ImportantDateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantDateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantDateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
