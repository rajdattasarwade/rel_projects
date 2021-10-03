import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOtpServiceComponent } from './generate-otp-service.component';

describe('GenerateOtpServiceComponent', () => {
  let component: GenerateOtpServiceComponent;
  let fixture: ComponentFixture<GenerateOtpServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateOtpServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateOtpServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
