import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovBuybackComponent } from './cov-buyback.component';

describe('CovBuybackComponent', () => {
  let component: CovBuybackComponent;
  let fixture: ComponentFixture<CovBuybackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovBuybackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovBuybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
