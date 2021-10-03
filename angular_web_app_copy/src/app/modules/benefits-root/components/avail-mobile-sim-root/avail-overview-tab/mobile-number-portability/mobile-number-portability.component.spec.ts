import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNumberPortabilityComponent } from './mobile-number-portability.component';

describe('MobileNumberPortabilityComponent', () => {
  let component: MobileNumberPortabilityComponent;
  let fixture: ComponentFixture<MobileNumberPortabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileNumberPortabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNumberPortabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
