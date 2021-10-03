import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamViewServiceComponent } from './team-view-service.component';

describe('TeamViewServiceComponent', () => {
  let component: TeamViewServiceComponent;
  let fixture: ComponentFixture<TeamViewServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamViewServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamViewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
