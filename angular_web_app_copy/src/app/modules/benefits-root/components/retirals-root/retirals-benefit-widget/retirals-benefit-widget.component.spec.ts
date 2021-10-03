import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiralsBenefitWidgetComponent } from './retirals-benefit-widget.component';

describe('RetiralsBenefitWidgetComponent', () => {
  let component: RetiralsBenefitWidgetComponent;
  let fixture: ComponentFixture<RetiralsBenefitWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiralsBenefitWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiralsBenefitWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
