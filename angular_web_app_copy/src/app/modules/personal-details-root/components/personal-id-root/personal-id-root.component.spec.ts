import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalIdRootComponent } from './personal-id-root.component';

describe('PersonalIdRootComponent', () => {
  let component: PersonalIdRootComponent;
  let fixture: ComponentFixture<PersonalIdRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalIdRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalIdRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
