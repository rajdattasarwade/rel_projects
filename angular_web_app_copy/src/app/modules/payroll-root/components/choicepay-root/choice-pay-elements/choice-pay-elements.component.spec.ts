import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePayElementsComponent } from './choice-pay-elements.component';

describe('ChoicePayElementsComponent', () => {
  let component: ChoicePayElementsComponent;
  let fixture: ComponentFixture<ChoicePayElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicePayElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicePayElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
