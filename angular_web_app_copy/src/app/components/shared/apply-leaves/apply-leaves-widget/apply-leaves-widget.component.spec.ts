import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLeavesWidgetComponent } from './apply-leaves-widget.component';

describe('ApplyLeavesWidgetComponent', () => {
  let component: ApplyLeavesWidgetComponent;
  let fixture: ComponentFixture<ApplyLeavesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyLeavesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLeavesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
