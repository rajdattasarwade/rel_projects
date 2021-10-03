import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsListPopupComponent } from './hospitals-list-popup.component';

describe('HospitalsListPopupComponent', () => {
  let component: HospitalsListPopupComponent;
  let fixture: ComponentFixture<HospitalsListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalsListPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
