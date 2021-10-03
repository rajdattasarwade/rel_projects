import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalFormServiceComponent } from './digital-form-service.component';

describe('DigitalFormServiceComponent', () => {
  let component: DigitalFormServiceComponent;
  let fixture: ComponentFixture<DigitalFormServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalFormServiceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalFormServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
