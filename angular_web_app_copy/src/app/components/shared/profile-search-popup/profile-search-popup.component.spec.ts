import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSearchPopupComponent } from './profile-search-popup.component';

describe('ProfileSearchPopupComponent', () => {
  let component: ProfileSearchPopupComponent;
  let fixture: ComponentFixture<ProfileSearchPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSearchPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSearchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
