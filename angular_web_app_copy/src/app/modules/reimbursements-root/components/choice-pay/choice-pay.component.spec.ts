import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePayComponent } from './choice-pay.component';

describe('ChoicePayComponent', () => {
  let component: ChoicePayComponent;
  let fixture: ComponentFixture<ChoicePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
