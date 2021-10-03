import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardVerticalComponent } from './profile-card-vertical.component';

describe('ProfileCardVerticalComponent', () => {
  let component: ProfileCardVerticalComponent;
  let fixture: ComponentFixture<ProfileCardVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCardVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCardVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
