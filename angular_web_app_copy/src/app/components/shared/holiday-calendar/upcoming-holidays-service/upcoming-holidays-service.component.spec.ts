import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingHolidaysServiceComponent } from './upcoming-holidays-service.component';

describe('UpcomingHolidaysServiceComponent', () => {
  let component: UpcomingHolidaysServiceComponent;
  let fixture: ComponentFixture<UpcomingHolidaysServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingHolidaysServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingHolidaysServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
