import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleCardListComponent } from './people-card-list.component';

describe('PeopleCardListComponent', () => {
  let component: PeopleCardListComponent;
  let fixture: ComponentFixture<PeopleCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
