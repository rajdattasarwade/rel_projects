import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBuildingAdvanceComponent } from './team-building-advance.component';

describe('TeamBuildingAdvanceComponent', () => {
  let component: TeamBuildingAdvanceComponent;
  let fixture: ComponentFixture<TeamBuildingAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBuildingAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBuildingAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
