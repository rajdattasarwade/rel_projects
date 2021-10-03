import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOtpWidgetComponent } from './generate-otp-widget.component';

describe('GenerateOtpWidgetComponent', () => {
  let component: GenerateOtpWidgetComponent;
  let fixture: ComponentFixture<GenerateOtpWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateOtpWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateOtpWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
