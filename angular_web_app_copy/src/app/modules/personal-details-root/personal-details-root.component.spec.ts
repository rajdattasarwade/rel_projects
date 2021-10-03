import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsRootComponent } from './personal-details-root.component';

describe('PersonalDetailsRootComponent', () => {
  let component: PersonalDetailsRootComponent;
  let fixture: ComponentFixture<PersonalDetailsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDetailsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
