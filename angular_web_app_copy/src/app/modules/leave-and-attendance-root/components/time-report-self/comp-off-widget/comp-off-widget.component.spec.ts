import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompOffWidgetComponent } from './comp-off-widget.component';

describe('CompOffWidgetComponent', () => {
  let component: CompOffWidgetComponent;
  let fixture: ComponentFixture<CompOffWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompOffWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompOffWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
