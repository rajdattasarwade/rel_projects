import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfYearWiseDetailsComponent } from './pf-year-wise-details.component';

describe('PfYearWiseDetailsComponent', () => {
  let component: PfYearWiseDetailsComponent;
  let fixture: ComponentFixture<PfYearWiseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfYearWiseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfYearWiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
