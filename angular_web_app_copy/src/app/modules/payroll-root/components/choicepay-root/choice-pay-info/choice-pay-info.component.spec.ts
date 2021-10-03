import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePayInfoComponent } from './choice-pay-info.component';

describe('ChoicePayInfoComponent', () => {
  let component: ChoicePayInfoComponent;
  let fixture: ComponentFixture<ChoicePayInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicePayInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicePayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
