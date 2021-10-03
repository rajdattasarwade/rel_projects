import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTaxPrjServiceComponent } from './income-tax-prj-service.component';

describe('IncomeTaxPrjServiceComponent', () => {
  let component: IncomeTaxPrjServiceComponent;
  let fixture: ComponentFixture<IncomeTaxPrjServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeTaxPrjServiceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTaxPrjServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
