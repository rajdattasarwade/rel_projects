import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavEmpEngagementComponent } from './sidenav-emp-engagement.component';

describe('SidenavEmpEngagementComponent', () => {
  let component: SidenavEmpEngagementComponent;
  let fixture: ComponentFixture<SidenavEmpEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavEmpEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavEmpEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
