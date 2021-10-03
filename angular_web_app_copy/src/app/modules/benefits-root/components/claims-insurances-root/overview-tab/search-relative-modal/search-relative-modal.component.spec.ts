import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRelativeModalComponent } from './search-relative-modal.component';

describe('SearchRelativeModalComponent', () => {
  let component: SearchRelativeModalComponent;
  let fixture: ComponentFixture<SearchRelativeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRelativeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRelativeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
