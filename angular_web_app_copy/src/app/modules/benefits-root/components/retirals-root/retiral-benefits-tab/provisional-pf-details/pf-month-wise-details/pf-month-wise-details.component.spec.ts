import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfMonthWiseDetailsComponent } from './pf-month-wise-details.component';

describe('PfMonthWiseDetailsComponent', () => {
  let component: PfMonthWiseDetailsComponent;
  let fixture: ComponentFixture<PfMonthWiseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfMonthWiseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfMonthWiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
