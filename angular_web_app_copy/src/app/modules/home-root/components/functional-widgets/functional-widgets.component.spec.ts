import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalWidgetsComponent } from './functional-widgets.component';

describe('FunctionalWidgetsComponent', () => {
  let component: FunctionalWidgetsComponent;
  let fixture: ComponentFixture<FunctionalWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
