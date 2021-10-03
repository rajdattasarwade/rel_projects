import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperannuationYearWiseDetailsComponent } from './superannuation-year-wise-details.component';

describe('SuperannuationYearWiseDetailsComponent', () => {
  let component: SuperannuationYearWiseDetailsComponent;
  let fixture: ComponentFixture<SuperannuationYearWiseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperannuationYearWiseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperannuationYearWiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
