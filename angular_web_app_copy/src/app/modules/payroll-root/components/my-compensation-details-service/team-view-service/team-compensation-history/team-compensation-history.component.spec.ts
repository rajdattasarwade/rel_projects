import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCompensationHistoryComponent } from './team-compensation-history.component';

describe('TeamCompensationHistoryComponent', () => {
  let component: TeamCompensationHistoryComponent;
  let fixture: ComponentFixture<TeamCompensationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCompensationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCompensationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
