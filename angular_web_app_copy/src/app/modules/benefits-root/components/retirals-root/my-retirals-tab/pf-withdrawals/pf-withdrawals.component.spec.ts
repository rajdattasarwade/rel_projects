import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfWithdrawalsComponent } from './pf-withdrawals.component';

describe('PfWithdrawalsComponent', () => {
  let component: PfWithdrawalsComponent;
  let fixture: ComponentFixture<PfWithdrawalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfWithdrawalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfWithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
