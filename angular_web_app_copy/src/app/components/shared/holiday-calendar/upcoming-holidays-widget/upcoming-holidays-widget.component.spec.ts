import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingHolidaysWidgetComponent } from './upcoming-holidays-widget.component';

describe('UpcomingHolidaysWidgetComponent', () => {
  let component: UpcomingHolidaysWidgetComponent;
  let fixture: ComponentFixture<UpcomingHolidaysWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingHolidaysWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingHolidaysWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
