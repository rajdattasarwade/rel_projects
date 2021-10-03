import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWorkLocationComponent } from './current-work-location.component';

describe('CurrentWorkLocationComponent', () => {
  let component: CurrentWorkLocationComponent;
  let fixture: ComponentFixture<CurrentWorkLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentWorkLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWorkLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
