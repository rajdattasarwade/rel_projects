import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthWellnessModalComponent } from './health-wellness-modal.component';

describe('HealthWellnessModalComponent', () => {
  let component: HealthWellnessModalComponent;
  let fixture: ComponentFixture<HealthWellnessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthWellnessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthWellnessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
