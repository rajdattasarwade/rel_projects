import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputationOtherComponent } from './deputation-other.component';

describe('DeputationOtherComponent', () => {
  let component: DeputationOtherComponent;
  let fixture: ComponentFixture<DeputationOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputationOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputationOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
