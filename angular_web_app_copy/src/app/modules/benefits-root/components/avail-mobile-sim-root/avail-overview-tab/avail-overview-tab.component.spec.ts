import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailOverviewTabComponent } from './avail-overview-tab.component';

describe('AvailOverviewTabComponent', () => {
  let component: AvailOverviewTabComponent;
  let fixture: ComponentFixture<AvailOverviewTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailOverviewTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailOverviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
