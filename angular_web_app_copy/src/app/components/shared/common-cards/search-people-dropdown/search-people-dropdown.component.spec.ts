import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPeopleDropdownComponent } from './search-people-dropdown.component';

describe('SearchPeopleDropdownComponent', () => {
  let component: SearchPeopleDropdownComponent;
  let fixture: ComponentFixture<SearchPeopleDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPeopleDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPeopleDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
