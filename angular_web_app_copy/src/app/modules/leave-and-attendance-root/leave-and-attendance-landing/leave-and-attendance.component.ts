import { Component, OnInit } from '@angular/core';
import { LeaveAndAttendanceRootService } from '../leave-and-attendance-root.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  NHEligibility,
  storeColorCodes,
} from '../components/calendar/attendance-det.model';
import { LeaveRegHistoryPopupComponent } from '../components/leave-reg-history-popup/leave-reg-history-popup.component';
import { UpcomingHolidayService } from 'src/app/components/shared/holiday-calendar/upcoming-holiday.service';

export class absCountModel {
  noOfABSPerTwoMonths: number;
  month: string;
  year: string;

  constructor() {
    this.noOfABSPerTwoMonths = 0;
    this.month = '';
    this.year = '';
  }
}

@Component({
  selector: 'app-leave-and-attendance',
  templateUrl: './leave-and-attendance.component.html',
  styleUrls: ['./leave-and-attendance.component.css'],
})
export class LeaveAndAttendanceComponent implements OnInit {
  finalShortFallHrs: any;
  colorCode: any;
  public absCount: absCountModel;
  public subscriptionsList: Subscription[] = [];
  dataFlagValue: boolean = true;
  showCalendarView = 'tile';
  NHElegibility: boolean;

  showOTSlip: Boolean = false;
  constructor(
    private leaveAndAttendanceRootService: LeaveAndAttendanceRootService,
    private router: Router,
    public dialog: MatDialog,
    private holidayService: UpcomingHolidayService
  ) {}

  ngOnInit(): void {
    this.absCount = new absCountModel();
    this.callColorCodes();
    this.getAbsCount();
    this.getOTSlipUserValidate();
    this.checkNHWidgetEligibility();
  }

  checkNHWidgetEligibility() {
    this.subscriptionsList.push(
      this.holidayService.getNationalHolidayElig().subscribe((data) => {
        this.NHElegibility = data['isEligible'];
        NHEligibility.isEligible = this.NHElegibility;
      })
    );
  }

  displayCalendarView(view) {
    this.showCalendarView = view;
  }

  callColorCodes() {
    // this.colorCode = this.leaveAndAttendanceRootService.colorCodeJson;
    // this.colorCode.forEach((color) => {
    //   var colorInfo = {
    //     [color.attendanceType]: color.attendanceColorCode,
    //   };
    //   storeColorCodes.colorCodeObj.push(colorInfo);
    // });
    this.subscriptionsList.push(
      this.leaveAndAttendanceRootService.storeColorCodes().subscribe(
        (data) => {
          if (data) {
            this.colorCode = data;
            this.colorCode.forEach((color) => {
              var colorInfo = {
                [color.attendanceType]: color.attendanceColorCode,
              };
              storeColorCodes.colorCodeObj.push(colorInfo);
            });
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }

  displayShortfallHrs(shortfallHrs) {
    this.finalShortFallHrs = shortfallHrs;
  }

  getAbsCount() {
    // this.absCount = this.leaveAndAttendanceRootService.absCountRes;
    this.absCount = new absCountModel();
    let today = new Date();
    let presentMonth = today.getMonth() + 1;
    let presentYear = today.getFullYear();
    // this.absCount = this.leaveAndAttendanceRootService.getAbsCount(
    //   presentMonth,
    //   presentYear
    // );
    this.subscriptionsList.push(
      this.leaveAndAttendanceRootService
        .getAbsCount(presentMonth, presentYear)
        .subscribe((res: any) => {
          this.absCount = res;
          for (var key in this.absCount) {
            if (this.absCount[key] == null) {
              this.absCount[key] = 0;
            }
          }
        })
    );
  }

  routeToteamReportTeam() {
    this.router.navigate(['leave-and-attendance/teamAttendanceReport']);
  }

  routeToShiftChange() {
    this.router.navigate(['leave-and-attendance/shiftPlanning']);
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
  // viewTeamAttendanceReport() {
  //   this.router.navigate(['leave-and-attendance/teamAttendanceReport']);
  // }

  getOTSlipUserValidate() {
    this.subscriptionsList.push(
      this.leaveAndAttendanceRootService.getOTSlipEligibility().subscribe(
        (data) => {
          if (data && data['eligible'] == true) {
            this.showOTSlip = true;
          } else {
            this.showOTSlip = false;
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }
}
