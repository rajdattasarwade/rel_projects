import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { UpcomingHolidayService } from '../upcoming-holiday.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upcoming-holidays-widget',
  templateUrl: './upcoming-holidays-widget.component.html',
  styleUrls: ['./upcoming-holidays-widget.component.css'],
})
export class UpcomingHolidaysWidgetComponent implements OnInit {
  panelOpenState = false;
  upcoming_holidays: any = [];
  holidaylist: any = [];
  subscription: Subscription[] = [];

  constructor(
    private router: Router,
    private holidayService: UpcomingHolidayService
  ) {}

  ngOnInit(): void {
    let year = new Date().getFullYear();
    if (this.holidayService.cachedHolidayObj.length > 0) {
      if (this.holidayService.cachedHolidayObj[year] != undefined) {
        this.holidaylist = this.holidayService.cachedHolidayObj[year];
        this.filterHolidays();
      } else {
        this.callApi(year);
      }
    } else {
      this.callApi(year);
    }
  }
  callApi(year) {
    this.subscription.push(
      this.holidayService.getHolidayList(year).subscribe((response) => {
        this.holidaylist = response;
        this.holidayService.cacheHolidayList(this.holidaylist, year);
        this.filterHolidays();
      })
    );

  }
  filterHolidays() {
    this.holidayService.sortByKey(
      this.holidaylist,
      'holidayStartDate'
    );
    let upcomingholidays = this.holidaylist.filter((item) => {
      return item.holidayStartDate >= new Date().getTime();
    });
    for (let i = 0; i < 3; i++){
      if (upcomingholidays[i]) {
        this.upcoming_holidays.push(upcomingholidays[i])
      }
    }
  }
  ngOnDestroy() {
    if (this.subscription.length > 0) {
      this.subscription.forEach((s) => s.unsubscribe());
    }
  }
  upcomingHolidayList() {
    this.router.navigate(['leave-and-attendance/upcomingHolidayList']);
  }
}
