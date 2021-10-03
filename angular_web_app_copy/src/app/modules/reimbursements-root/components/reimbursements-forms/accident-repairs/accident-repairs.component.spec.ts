import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentRepairsComponent } from './accident-repairs.component';

describe('AccidentRepairsComponent', () => {
  let component: AccidentRepairsComponent;
  let fixture: ComponentFixture<AccidentRepairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentRepairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
