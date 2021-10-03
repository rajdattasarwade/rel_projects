import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasteEditComponent } from './caste-edit.component';

describe('CasteEditComponent', () => {
  let component: CasteEditComponent;
  let fixture: ComponentFixture<CasteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
