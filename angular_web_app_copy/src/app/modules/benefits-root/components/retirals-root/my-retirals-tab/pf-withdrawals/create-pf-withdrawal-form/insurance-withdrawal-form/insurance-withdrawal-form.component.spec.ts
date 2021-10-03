import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceWithdrawalFormComponent } from './insurance-withdrawal-form.component';

describe('InsuranceWithdrawalFormComponent', () => {
  let component: InsuranceWithdrawalFormComponent;
  let fixture: ComponentFixture<InsuranceWithdrawalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceWithdrawalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceWithdrawalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
