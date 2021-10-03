import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsDetailModalComponent } from './hospitals-detail-modal.component';

describe('HospitalsDetailModalComponent', () => {
  let component: HospitalsDetailModalComponent;
  let fixture: ComponentFixture<HospitalsDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalsDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
