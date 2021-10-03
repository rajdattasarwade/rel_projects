import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperannuationMonthWiseDetailsComponent } from './superannuation-month-wise-details.component';

describe('SuperannuationMonthWiseDetailsComponent', () => {
  let component: SuperannuationMonthWiseDetailsComponent;
  let fixture: ComponentFixture<SuperannuationMonthWiseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperannuationMonthWiseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperannuationMonthWiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
