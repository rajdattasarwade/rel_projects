import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySearchListComponent } from './policy-search-list.component';

describe('PolicySearchListComponent', () => {
  let component: PolicySearchListComponent;
  let fixture: ComponentFixture<PolicySearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicySearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicySearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
