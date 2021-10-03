import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiralBenefitsTabComponent } from './retiral-benefits-tab.component';

describe('RetiralBenefitsTabComponent', () => {
  let component: RetiralBenefitsTabComponent;
  let fixture: ComponentFixture<RetiralBenefitsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiralBenefitsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiralBenefitsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
