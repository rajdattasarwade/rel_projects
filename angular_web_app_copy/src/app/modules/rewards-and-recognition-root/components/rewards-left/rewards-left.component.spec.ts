import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsLeftComponent } from './rewards-left.component';

describe('RewardsLeftComponent', () => {
  let component: RewardsLeftComponent;
  let fixture: ComponentFixture<RewardsLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
