import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationRootComponent } from './personal-information-root.component';

describe('PersonalInformationRootComponent', () => {
  let component: PersonalInformationRootComponent;
  let fixture: ComponentFixture<PersonalInformationRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalInformationRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
