import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleCardRectangularComponent } from './people-card-rectangular.component';

describe('PeopleCardRectangularComponent', () => {
  let component: PeopleCardRectangularComponent;
  let fixture: ComponentFixture<PeopleCardRectangularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleCardRectangularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleCardRectangularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
