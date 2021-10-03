import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestHousingLoanComponent } from './interest-housing-loan.component';

describe('InterestHousingLoanModalComponent', () => {
  let component: InterestHousingLoanComponent;
  let fixture: ComponentFixture<InterestHousingLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestHousingLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestHousingLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
