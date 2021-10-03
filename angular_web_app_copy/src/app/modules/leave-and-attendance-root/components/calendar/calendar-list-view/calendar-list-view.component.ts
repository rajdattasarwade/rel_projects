import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AttendanceCalendarService } from '../attendance-calendar.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import {
  MonthlyAttendanceDetail,
  storeColorCodes,
} from '../attendance-det.model';
import { MatDialog } from '@angular/material/dialog';
import { LeaveRequestModalComponent } from '../../leave-request-modal/leave-request-modal.component';
import { RegularizeModalComponent } from '../../regularize-modal/regularize-modal.component';
import { UpcomingHolidayService } from 'src/app/components/shared/holiday-calendar/upcoming-holiday.service';
import { takeWhile } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar-list-view',
  templateUrl: './calendar-list-view.component.html',
  styleUrls: ['./calendar-list-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarListViewComponent implements OnInit {
  AttendanceView: any = [];
  displayListViewEle: any = [];
  attendanceDet: MonthlyAttendanceDetail[];
  currentDate: any;
  selectedDate: any;
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  initialCalPayload: any;
  isAlive = true;
  displayedColumns: string[] = [
    'date',
    'shift',
    'actualTime',
    'attnStatus',
    'leaveStatus',
    'regStatus',
    'Computed_Hrs',
    'regTime',
    'leaveTime',
    'otGen',
    'otAppr',
  ];
  @ViewChild('picker') datepicker: MatDatepicker<any>;

  constructor(
    private attendanceCal: AttendanceCalendarService,
    public dialog: MatDialog,
    private holidayService: UpcomingHolidayService
  ) {}

  ngOnInit(): void {
    this.currentDate = moment(); // get today's date (moment)
    this.selectedDate = moment(this.currentDate).format('DD/MM/YYYY'); // format current date
    this.attendanceCal.generateCalendar(this.currentDate, true);
    this.attendanceCal.Attdata.pipe(takeWhile(() => this.isAlive)).subscribe(
      (res) => {
        if (!!res) {
          this.initialCalPayload = res;
          this.performCalendarAction();
        }
      }
    );
  }

  chosenMonthHandler(event) {
    this.currentDate = moment(event);
    this.attendanceCal.generateCalendar(this.currentDate, true); // calendar will be generated
    this.datepicker.close();
  }

  performCalendarAction() {
    var month = moment(this.initialCalPayload.currentDate)
      .format('DD/M/YYYY')
      .split('/')[1]; // format current date and get month (Eg:-For August --- 8)
    var year = moment(this.initialCalPayload.currentDate)
      .format('DD/MM/YYYY')
      .split('/')[2];
    this.refreshCalendar();
    //caching of api responses, if already present then no need to hit api rather take data from response, else hit Api
    if (this.initialCalPayload.apiActionFlag) {
      this.getAttendanceDetailFromApi(month, year);
    } else {
      this.attendanceDet = this.attendanceCal.cachedAttDetail[month + year];
      this.displayAttDataInTable(this.attendanceDet);
    }
  }

  getAttendanceDetailFromApi(month, year) {
    this.subscriptionsList.push(
      this.attendanceCal.getAttendanceDetails(month, year).subscribe(
        (data: MonthlyAttendanceDetail[]) => {
          if (data) {
            this.attendanceDet = data; // store API response of attendance detail model
            this.attendanceCal.cacheAttDetMonthWise(
              //cache data for future use
              month,
              year,
              this.attendanceDet
            );
            this.displayAttDataInTable(this.attendanceDet);
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }

  refreshCalendar() {
    this.displayListViewEle = [];
    this.AttendanceView = [];
  }

  displayAttDataInTable(attendanceDet) {
    attendanceDet.forEach((dayRecord) => {
      var actualIn = this.attendanceCal.formatInOutTime(dayRecord.actualIn); // default actual in time
      var actualOut = this.attendanceCal.formatInOutTime(dayRecord.actualOut); // default actual out time
      var actualTime =
        dayRecord.actualTime != 0
          ? this.attendanceCal.formatActualInAndDefaultHrs(dayRecord.actualTime)
          : 0; //total hrs covered by user
      var shiftTime =
        dayRecord.shiftTime != 0
          ? this.attendanceCal.formatActualInAndDefaultHrs(dayRecord.shiftTime)
          : 0; // default shift hrs for user
      var leaveStartTime = this.attendanceCal.formatInOutTime(
        dayRecord.leaveStartTime
      );
      var leaveEndTime = this.attendanceCal.formatInOutTime(
        dayRecord.leaveEndTime
      );
      var regIntime = this.attendanceCal.formatInOutTime(dayRecord.regIn);
      var regOuttime = this.attendanceCal.formatInOutTime(dayRecord.regOut);

      var holidayDet = this.bindPublicHolidays(dayRecord);
      var statusWithColorCode = this.handleColorCodingAndStatus(
        dayRecord.attCategory,
        holidayDet.status
      );
      var isFuture = this.attendanceCal.isFutureDates(
        moment(dayRecord.attStartDate).format('DD/MM/YYYY')
      );

      var dataObj = {
        date: moment(dayRecord.attStartDate).format('DD/MM/YY'),
        shift: isFuture
          ? dayRecord.shiftType
          : dayRecord.shiftType == ''
          ? '-'
          : dayRecord.shiftType,
        actualTime: this.displayfinalTime(actualIn, actualOut, isFuture),
        attnStatus: isFuture
          ? dayRecord.attStatus
          : statusWithColorCode.split('-')[0] != ''
          ? statusWithColorCode.split('-')[0]
          : '-',
        leaveStatus: isFuture
          ? dayRecord.leaveStatus
          : dayRecord.leaveStatus != ''
          ? dayRecord.leaveStatus
          : '-',
        regStatus: isFuture
          ? dayRecord.regStatus
          : dayRecord.regStatus != ''
          ? dayRecord.regStatus
          : '-',
        Computed_Hrs: this.displayComputedAndShiftTime(
          actualTime,
          shiftTime,
          isFuture
        ),
        regTime: this.displayfinalTime(regIntime, regOuttime, isFuture),
        leaveTime: this.displayfinalTime(
          leaveStartTime,
          leaveEndTime,
          isFuture
        ),
        otGen: isFuture
          ? dayRecord.overTimeGenerated
          : dayRecord.overTimeGenerated != ''
          ? dayRecord.overTimeGenerated
          : '-',
        otAppr: isFuture
          ? dayRecord.overTimeApproved
          : dayRecord.overTimeApproved != ''
          ? dayRecord.overTimeApproved
          : '-',
        disableBtn: dayRecord.disableButton,
        colorCode: statusWithColorCode.split('-')[1],
        startDate: dayRecord.attStartDate,
        fullDayRecord: dayRecord,
        attCategory: dayRecord.attCategory,
        holidayDesc: holidayDet.holidayDesc,
      };
      console.log(dataObj);
      this.displayListViewEle.push(dataObj);
    });
    this.AttendanceView = this.displayListViewEle;
  }

  bindPublicHolidays(dayRecord) {
    var attStatus, holidayDesc;
    if (
      this.holidayService.cachedHolidayObj[this.selectedDate.split('/')[2]] !=
      undefined
    ) {
      this.holidayService.cachedHolidayObj[
        this.selectedDate.split('/')[2]
      ].forEach((holidayDetails) => {
        var holidayStartDate = new Date(holidayDetails.holidayStartDate);
        var dayStartDate = new Date(dayRecord.attStartDate);

        var isEqualData = this.attendanceCal.checkIfDatesAreEqualSimple(
          holidayStartDate,
          dayStartDate
        );
        if (isEqualData) {
          if (dayRecord.attStatus == '') {
            attStatus = holidayDetails.holidayType;
            holidayDesc = holidayDetails.holidayDesc;
          } else {
            attStatus = dayRecord.attStatus;
            holidayDesc = holidayDetails.holidayDesc;
          }
        } else {
          if (attStatus != 'PH') {
            attStatus = dayRecord.attStatus; //wo, prs/oph/cl/abs(codes)
            holidayDesc = '';
          }
        }
      });
    } else {
    }

    return {
      status: attStatus,
      holidayDesc: holidayDesc,
    };
  }

  displayfinalTime(InTime, OutTime, isFuture) {
    var finalTime;
    if (isFuture) {
      finalTime = '';
    } else {
      if (InTime != '00:00' && OutTime == '00:00') {
        finalTime = InTime + '-' + 'NA';
      } else if (InTime == '00:00' && OutTime != '00:00') {
        finalTime = 'NA' + '-' + OutTime;
      } else if (InTime == '00:00' && OutTime == '00:00') {
        finalTime = '-';
      } else {
        finalTime = InTime + '-' + OutTime;
      }
    }

    return finalTime;
  }

  displayComputedAndShiftTime(actualTime, shiftTime, isFuture) {
    var finalComputedHrs;
    if (isFuture) {
      finalComputedHrs = '';
    } else {
      if (actualTime != 0 && shiftTime == 0) {
        finalComputedHrs = actualTime + '/' + '00:00';
      } else if (actualTime == 0 && shiftTime != 0) {
        finalComputedHrs = '00:00' + '/' + shiftTime;
      } else if (actualTime == 0 && shiftTime == 0) {
        finalComputedHrs = '-';
      } else {
        finalComputedHrs = actualTime + '/' + shiftTime;
      }
    }

    return finalComputedHrs;
  }

  handleColorCodingAndStatus(category, status) {
    var attStatus, Colorcode;
    switch (category) {
      case 'WEEKLY_OFF': {
        if (status == '') {
          attStatus = 'WO';
          Colorcode = this.loopOverColorCodes(attStatus);
          return attStatus + '-' + Colorcode;
        } else {
          Colorcode = this.loopOverColorCodes(status);
          return status + '-' + Colorcode;
        }

        break;
      }
      case 'NORMAL': {
        Colorcode = this.loopOverColorCodes(status);
        return status + '-' + Colorcode;
        break;
      }
      case 'PUBLIC_HOLIDAY': {
        attStatus = 'PH';
        Colorcode = this.loopOverColorCodes(attStatus);
        return attStatus + '-' + Colorcode;
        break;
      }
      case 'REGULARIZE': {
        Colorcode = this.loopOverColorCodes(status);
        return status + '-' + Colorcode;
        break;
      }
      case 'ABSENT': {
        Colorcode = this.loopOverColorCodes(status);
        return status + '-' + Colorcode;
        break;
      }
      case 'LEAVE': {
        Colorcode = this.loopOverColorCodes(status);
        return status + '-' + Colorcode;
        break;
      }
      case 'REGULARIZE_ONE_TOUCH': {
        Colorcode = this.loopOverColorCodes(status);
        return status + '-' + Colorcode;
        break;
      }
      default: {
        Colorcode = '#959595';
        return status + '-' + Colorcode;
        break;
      }
    }
  }

  loopOverColorCodes(status) {
    var colorCode;
    storeColorCodes.colorCodeObj.forEach((color) => {
      //{prs:111}
      if (Object.keys(color) == status) {
        colorCode = color[status];
      }
    });
    return colorCode;
  }

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.attendanceCal.generateCalendar(this.currentDate, true);
    // this.performCalendarAction();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.attendanceCal.generateCalendar(this.currentDate, true);
    // this.performCalendarAction();
  }

  applyLeave(date) {
    const dialogRef = this.dialog.open(LeaveRequestModalComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.selectedDate = date;
    dialogRef.componentInstance.flag = 'list';
  }

  openRegularize(date, dayRecord) {
    var dataObj = {
      data: dayRecord,
      selectedDate: date,
      flag: 'list',
    };
    const dialogRef = this.dialog.open(RegularizeModalComponent, {
      width: '600px',
      data: { dateClicked: dataObj },
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
