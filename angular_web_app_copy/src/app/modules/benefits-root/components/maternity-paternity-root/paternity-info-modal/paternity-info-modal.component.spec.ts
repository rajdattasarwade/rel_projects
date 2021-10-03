import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaternityInfoModalComponent } from './paternity-info-modal.component';

describe('PaternityInfoModalComponent', () => {
  let component: PaternityInfoModalComponent;
  let fixture: ComponentFixture<PaternityInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaternityInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaternityInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
