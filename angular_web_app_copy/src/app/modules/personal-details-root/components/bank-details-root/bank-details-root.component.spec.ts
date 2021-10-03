import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDetailsRootComponent } from './bank-details-root.component';

describe('BankDetailsRootComponent', () => {
  let component: BankDetailsRootComponent;
  let fixture: ComponentFixture<BankDetailsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankDetailsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDetailsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
