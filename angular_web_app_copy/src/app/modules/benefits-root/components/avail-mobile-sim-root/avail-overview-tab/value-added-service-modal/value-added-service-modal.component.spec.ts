import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueAddedServiceModalComponent } from './value-added-service-modal.component';

describe('ValueAddedServiceModalComponent', () => {
  let component: ValueAddedServiceModalComponent;
  let fixture: ComponentFixture<ValueAddedServiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueAddedServiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueAddedServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
