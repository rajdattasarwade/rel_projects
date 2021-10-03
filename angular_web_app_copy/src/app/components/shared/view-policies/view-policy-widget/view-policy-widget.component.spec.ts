import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPolicyWidgetComponent } from './view-policy-widget.component';

describe('ViewPolicyWidgetComponent', () => {
  let component: ViewPolicyWidgetComponent;
  let fixture: ComponentFixture<ViewPolicyWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPolicyWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPolicyWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
