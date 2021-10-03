import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalViewServiceComponent } from './personal-view-service.component';

describe('PersonalViewServiceComponent', () => {
  let component: PersonalViewServiceComponent;
  let fixture: ComponentFixture<PersonalViewServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalViewServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalViewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
