import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayComponentsComponent } from './pay-components.component';

describe('PayComponentsComponent', () => {
  let component: PayComponentsComponent;
  let fixture: ComponentFixture<PayComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
