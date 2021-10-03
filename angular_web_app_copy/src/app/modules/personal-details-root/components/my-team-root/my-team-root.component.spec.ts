import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamRootComponent } from './my-team-root.component';

describe('MyTeamRootComponent', () => {
  let component: MyTeamRootComponent;
  let fixture: ComponentFixture<MyTeamRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTeamRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
