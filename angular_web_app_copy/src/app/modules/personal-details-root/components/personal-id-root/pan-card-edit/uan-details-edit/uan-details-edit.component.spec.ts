import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UanDetailsEditComponent } from './uan-details-edit.component';

describe('UanDetailsEditComponent', () => {
  let component: UanDetailsEditComponent;
  let fixture: ComponentFixture<UanDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UanDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UanDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
