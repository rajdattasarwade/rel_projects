import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimInsuranceWidgetComponent } from './claim-insurance-widget.component';

describe('ClaimInsuranceWidgetComponent', () => {
  let component: ClaimInsuranceWidgetComponent;
  let fixture: ComponentFixture<ClaimInsuranceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimInsuranceWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimInsuranceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
