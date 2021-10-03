import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
  Input,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import * as range from 'lodash.range';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceCalendarService } from '../attendance-calendar.service';
import { Subscription } from 'rxjs';
import isWithinInterval from 'date-fns/isWithinInterval';
import {
  AttendanceDetModel,
  MonthlyAttendanceDetail,
  storeColorCodes,
} from '../attendance-det.model';
import { CalActionPopupComponent } from '../../cal-action-popup/cal-action-popup.component';
import { UpcomingHolidayService } from '../../../../../components/shared/holiday-calendar/upcoming-holiday.service';
import { ShiftChangeModalComponent } from '../../shift-change/my-shift/shift-change-modal/shift-change-modal.component';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { takeWhile } from 'rxjs/operators';
import { getYear, getMonth, getDaysInMonth } from 'date-fns';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-attendance-calendar',
  templateUrl: './attendance-calendar.component.html',
  styleUrls: ['./attendance-calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AttendanceCalendarComponent implements OnInit {
  @Input() dataFlag: string; // handle show/hide of data. If value false then empty calendar else filled calendar with binded data
  @Output() shortfallHrs = new EventEmitter(); //emit shortfall hrs to parent component (leave attendance landing)
  attendanceDet: MonthlyAttendanceDetail[]; // store attendance details
  public currentDate: moment.Moment; //getToday Date
  public namesOfDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']; //for viewing name of days
  public weeks: Array<CalendarDate[]> = []; // store array of attendance details with calendar data
  public selectedDate; //formatted current date
  currentMonth: any; // store current month
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  @Input() myshiftFlag: any; //handle the myshift
  @Output() updateShiftChange = new EventEmitter<string>();
  initialCalPayload: any;
  isAlive = true;
  @ViewChild('picker') datepicker: MatDatepicker<any>;

  constructor(
    public dialog: MatDialog,
    public attendanceCal: AttendanceCalendarService,
    public holidayService: UpcomingHolidayService,
    public modalService: MessageModalService
  ) {}

  ngOnInit() {
    this.currentDate = moment(); // get today's date (moment)
    this.selectedDate = moment(this.currentDate).format('DD/MM/YYYY'); // format current date
    this.currentMonth = moment(this.currentDate).format('MMMM'); // format current date and get month (Eg:-August)
    this.attendanceCal.generateCalendar(this.currentDate, this.dataFlag); // calendar will be generated
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
    this.attendanceCal.generateCalendar(this.currentDate, this.dataFlag); // calendar will be generated
    this.datepicker.close();
  }

  //to generate calendar dynamically (method definition)
  performCalendarAction() {
    var month = moment(this.initialCalPayload.currentDate)
      .format('DD/M/YYYY')
      .split('/')[1]; // format current date and get month (Eg:-For August --- 8)
    var year = moment(this.initialCalPayload.currentDate)
      .format('DD/MM/YYYY')
      .split('/')[2];
    //caching of api responses, if already present then no need to hit api rather take data from response, else hit Api
    if (this.initialCalPayload.dataFlag) {
      if (this.initialCalPayload.apiActionFlag) {
        this.getAttendanceDetailFromApi(month, year);
        this.refreshCalendar();
      } else {
        this.attendanceDet = this.attendanceCal.cachedAttDetail[month + year];
        this.generateCalendarByFillingDates(); // fill calendar dynamically with data to show
        this.refreshCalendar();
      }
    } else {
      this.generateCalendarByFillingDates();
    }
  }

  //Api call
  getAttendanceDetailFromApi(month, year) {
    this.refreshCalendar();
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
            console.log(this.attendanceCal.cachedAttDetail);
            this.generateCalendarByFillingDates(); // fill calendar dynamically with data to show
          }
        },
        (error) => {}
      )
    );
  }

  getCurrentDateFromPopup(flag, currDate) {
    this.dataFlag = flag;
    this.currentDate = moment(currDate);
  }

  refreshCalendar() {
    AttendanceDetModel.actualIn = '';
    AttendanceDetModel.actualOut = '';
    AttendanceDetModel.shiftStartTime = '';
    AttendanceDetModel.attCategory = '';
    AttendanceDetModel.attStatus = '';
    AttendanceDetModel.shiftEndTime = '';
    AttendanceDetModel.shiftType = '';
    AttendanceDetModel.actualTime = '';
    AttendanceDetModel.shiftTime = '';
    AttendanceDetModel.isToday = '';
    AttendanceDetModel.isSelected = '';
    AttendanceDetModel.mDate = '';
    AttendanceDetModel.colorCode = '';
    AttendanceDetModel.holidayDesc = '';
  }

  generateCalendarByFillingDates() {
    const dates = this.fillDates(this.currentDate); // fill data acc to current date.
    const weeks = [];
    this.attendanceCal.gridViewAttArray = [];
    while (dates.length > 0) {
      this.attendanceCal.gridViewAttArray.push(dates.splice(0, 7)); // store data like 7 days at a time for first row
    }
    this.weeks = this.attendanceCal.gridViewAttArray;
    //pass data weekly (7 days) at a time
  }

  // fill dates in calendar
  fillDates(currentMoment: moment.Moment) {
    const firstOfMonth = moment(currentMoment).startOf('month').day(); //week's day on 1st of month
    const lastOfMonth = moment(currentMoment).endOf('month').day(); //week's day on last of month
    const firstDayOfGrid = moment(currentMoment)
      .startOf('month')
      .subtract(firstOfMonth, 'days'); //first date of calendar grid
    const lastDayOfGrid = moment(currentMoment)
      .endOf('month')
      .subtract(lastOfMonth, 'days')
      .add(7, 'days'); //last date of calendar grid
    const startCalendar = firstDayOfGrid.date(); //dynamically create calendar grid from first date of calendar

    return range(
      startCalendar,
      startCalendar + lastDayOfGrid.diff(firstDayOfGrid, 'days')
    ).map((date) => {
      const newDate = moment(firstDayOfGrid).date(date);
      if (this.initialCalPayload.dataFlag) {
        if (this.currentDate.format('MMMM') == newDate.format('MMMM')) {
          this.attendanceDet.forEach((dayRecord) => {
            this.getShortFallHrs(dayRecord);
            var firstDate = new Date(dayRecord.attStartDate);
            var secondDateForComparison = moment(newDate).toDate();
            secondDateForComparison.setHours(
              secondDateForComparison.getHours() + 5
            );
            secondDateForComparison.setMinutes(
              secondDateForComparison.getMinutes() + 30
            );
            var isEqualData = this.attendanceCal.checkIfDatesAreEqualSimple(
              firstDate,
              secondDateForComparison
            );
            // this.displayAttDayData(dayRecord, newDate);
            if (isEqualData) {
              this.displayAttDayData(dayRecord, newDate);
            }
          });
          return {
            today: this.isToday(newDate), // boolean true/false
            selected: this.isSelected(newDate), //boolean true/false
            mDate: newDate, // date,
            actualIn: AttendanceDetModel.actualIn,
            actualOut: AttendanceDetModel.actualOut,
            shiftStartTime: AttendanceDetModel.shiftStartTime,
            shiftEndTime: AttendanceDetModel.shiftEndTime,
            attCategory: AttendanceDetModel.attCategory,
            attStatus: AttendanceDetModel.attStatus,
            colorCode: AttendanceDetModel.colorCode,
            shiftType: AttendanceDetModel.shiftType,
            shiftTime: AttendanceDetModel.shiftTime,
            actualTime: AttendanceDetModel.actualTime,
            holidayDesc: AttendanceDetModel.holidayDesc,
            isFuture: AttendanceDetModel.isFuture,
            isLeave: AttendanceDetModel.isLeave,
            leaveStatus: AttendanceDetModel.leaveStatus,
            leaveApplied: AttendanceDetModel.leaveApplied,
            isRegularize: AttendanceDetModel.isRegularize,
            regStatus: AttendanceDetModel.regStatus,
          };
        } else {
          return {
            today: this.isToday(newDate), // boolean true/false
            selected: this.isSelected(newDate), //boolean true/false
            mDate: '', // date,
            actualIn: AttendanceDetModel.actualIn,
            actualOut: AttendanceDetModel.actualOut,
            shiftStartTime: AttendanceDetModel.shiftStartTime,
            shiftEndTime: AttendanceDetModel.shiftEndTime,
            attCategory: AttendanceDetModel.attCategory,
            attStatus: AttendanceDetModel.attStatus,
            colorCode: AttendanceDetModel.colorCode,
            shiftType: AttendanceDetModel.shiftType,
            shiftTime: AttendanceDetModel.shiftTime,
            actualTime: AttendanceDetModel.actualTime,
            holidayDesc: AttendanceDetModel.holidayDesc,
            isFuture: AttendanceDetModel.isFuture,
            isLeave: AttendanceDetModel.isLeave,
            leaveStatus: AttendanceDetModel.leaveStatus,
            leaveApplied: AttendanceDetModel.leaveApplied,
            isRegularize: AttendanceDetModel.isRegularize,
            regStatus: AttendanceDetModel.regStatus,
          };
        }
      } else {
        return {
          today: this.isToday(newDate), // boolean true/false
          selected: this.isSelected(newDate), //boolean true/false
          mDate: newDate, // date,
        };
      }
    });
  }

  displayAttDayData(dayRecord, newDate) {
    AttendanceDetModel.attStatus = dayRecord.attStatus; //wo, prs/oph/cl/abs(codes)
    AttendanceDetModel.actualIn = this.attendanceCal.formatInOutTime(
      dayRecord.actualIn
    ); // default actual in time
    AttendanceDetModel.actualOut = this.attendanceCal.formatInOutTime(
      dayRecord.actualOut
    ); // default actual out time
    AttendanceDetModel.attCategory = dayRecord.attCategory; //normal, weekly_off
    AttendanceDetModel.actualTime =
      dayRecord.actualTime != 0
        ? this.attendanceCal.formatActualInAndDefaultHrs(dayRecord.actualTime)
        : 0; //total hrs covered by user
    AttendanceDetModel.shiftTime =
      dayRecord.shiftTime != 0
        ? this.attendanceCal.formatActualInAndDefaultHrs(dayRecord.shiftTime)
        : 0; // default shift hrs for user
    AttendanceDetModel.shiftStartTime = this.attendanceCal.formatInOutTime(
      dayRecord.shiftStartTime
    ); // default start time for cal action popup
    AttendanceDetModel.shiftEndTime = this.attendanceCal.formatInOutTime(
      dayRecord.shiftEndTime
    ); // default end time for cal action popup
    AttendanceDetModel.shiftType = dayRecord.shiftType; // FX9/Off etc for cal action popup
    AttendanceDetModel.isLeave = dayRecord.isLeave; //true in case leave applied(pending/approved) with mgr
    AttendanceDetModel.leaveStatus = dayRecord.leaveStatus; //Approved,Pending With Mgr
    AttendanceDetModel.leaveApplied = dayRecord.leaveApplied; //leave type
    AttendanceDetModel.isRegularize = dayRecord.isRegularize; //true/false
    AttendanceDetModel.regStatus = dayRecord.regStatus; //Pending With Mgr/Approved
    this.displayfinalPunchInAndOut();
    this.displayComputedAndShiftTime();
    AttendanceDetModel.isFuture = this.attendanceCal.isFutureDates(
      moment(newDate).format('DD/MM/YYYY')
    );
    this.bindPublicHolidays(newDate, dayRecord, AttendanceDetModel.attStatus);
    this.handleColorCoding(
      AttendanceDetModel.attCategory,
      AttendanceDetModel.attStatus
    );
  }

  displayComputedAndShiftTime() {
    if (
      AttendanceDetModel.actualTime != 0 &&
      AttendanceDetModel.shiftTime == 0
    ) {
    } else if (
      AttendanceDetModel.actualTime == 0 &&
      AttendanceDetModel.shiftTime != 0
    ) {
    } else if (
      AttendanceDetModel.actualTime == 0 &&
      AttendanceDetModel.shiftTime == 0
    ) {
      AttendanceDetModel.actualTime = '';
      AttendanceDetModel.shiftTime = '';
    }
  }

  displayfinalPunchInAndOut() {
    if (
      AttendanceDetModel.actualIn != '00:00' &&
      AttendanceDetModel.actualOut == '00:00'
    ) {
      AttendanceDetModel.actualOut = 'NA';
    } else if (
      AttendanceDetModel.actualIn == '00:00' &&
      AttendanceDetModel.actualOut != '00:00'
    ) {
      AttendanceDetModel.actualIn == 'NA';
    } else if (
      AttendanceDetModel.actualIn == '00:00' &&
      AttendanceDetModel.actualOut == '00:00'
    ) {
      AttendanceDetModel.actualIn = '';
      AttendanceDetModel.actualOut = '';
    }
  }

  handleColorCoding(category, status) {
    switch (category) {
      case 'WEEKLY_OFF': {
        if (status == '') {
          AttendanceDetModel.attStatus = 'WO';
        }
        AttendanceDetModel.colorCode = this.loopOverColorCodes(
          AttendanceDetModel.attStatus
        );
        break;
      }
      case 'NORMAL': {
        AttendanceDetModel.colorCode = this.loopOverColorCodes(status);
        break;
      }
      case 'PUBLIC_HOLIDAY': {
        AttendanceDetModel.colorCode = this.loopOverColorCodes('PH');
        break;
      }
      case 'REGULARIZE': {
        AttendanceDetModel.colorCode = this.loopOverColorCodes(status);
        break;
      }
      case 'ABSENT': {
        AttendanceDetModel.colorCode = this.loopOverColorCodes(status);
        break;
      }
      case 'LEAVE': {
        AttendanceDetModel.colorCode = this.loopOverColorCodes(status);
        break;
      }
      case 'REGULARIZE_ONE_TOUCH': {
        AttendanceDetModel.colorCode = this.loopOverColorCodes(status);
        break;
      }
      default: {
        AttendanceDetModel.colorCode = '#959595';
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

  bindPublicHolidays(newDate, dayRecord, status) {
    if (
      this.holidayService.cachedHolidayObj[
        moment(newDate).format('DD/MM/YYYY').split('/')[2]
      ] != undefined
    ) {
      this.holidayService.cachedHolidayObj[
        moment(newDate).format('DD/MM/YYYY').split('/')[2]
      ].forEach((holidayDetails) => {
        var holidayStartDate = new Date(holidayDetails.holidayStartDate);
        var dayStartDate = moment(newDate).toDate();
        dayStartDate.setHours(dayStartDate.getHours() + 5);
        dayStartDate.setMinutes(dayStartDate.getMinutes() + 30);
        var isEqualData = this.attendanceCal.checkIfDatesAreEqualSimple(
          holidayStartDate,
          dayStartDate
        );
        if (isEqualData) {
          if (AttendanceDetModel.attStatus != 'PH WFH') {
            AttendanceDetModel.attStatus = holidayDetails.holidayType; //wo, prs/oph/cl/abs(codes)
          }
          AttendanceDetModel.holidayDesc = holidayDetails.holidayDesc;
        } else {
          if (AttendanceDetModel.attStatus != 'PH') {
            AttendanceDetModel.attStatus = status; //wo, prs/oph/cl/abs(codes)
            AttendanceDetModel.holidayDesc = '';
          }
        }
      });
    } else {
    }
  }

  //   getShortFallHrs(dayRecord) {
  //       console.log('In shortfall');
  //   var firstDate = moment().endOf('week').toDate();

  //     var secondDate = new Date(dayRecord.attStartDate);
  //       console.log(secondDate);
  //     firstDate.setHours(firstDate.getHours() + 5);
  //     firstDate.setMinutes(firstDate.getMinutes() + 31);
  //     firstDate.setSeconds(firstDate.getSeconds() - 59);
  //     console.log(firstDate);
  //     if(firstDate.getTime() == secondDate.getTime()){
  //     // var isEqualData = this.attendanceCal.checkIfDatesAreEqualSimple(
  //     //   firstDate,
  //     //   secondDate
  //     // );
  //     // console.log(isEqualData);
  //     // if (isEqualData) {
  //       var shortfallHrs;
  //       if (dayRecord.actualTime == 0 && dayRecord.shiftTime == 0) {
  //         shortfallHrs = 0;
  //         console.log('if');
  //         console.log(shortfallHrs);
  //         this.shortfallHrs.emit(shortfallHrs);
  //       } else {
  //         var totalHrs = parseFloat(dayRecord.shiftTime);
  //         var workedHrs = parseFloat(dayRecord.actualTime);
  //         var difference = totalHrs - workedHrs;
  //         if (difference < 0) {
  //           shortfallHrs = 0;
  //             console.log('nested if');
  //         console.log(shortfallHrs);
  //           this.shortfallHrs.emit(shortfallHrs);
  //         } else {
  //               console.log('else');
  //         console.log(shortfallHrs);
  //           shortfallHrs = this.attendanceCal.time_convert(difference);
  //           this.shortfallHrs.emit(shortfallHrs);
  //         }
  //       }
  //     }
  //   }

  getShortFallHrs(dayRecord) {
    console.log('In shortfall');
    var firstDate = moment().endOf('week').toDate();

    var secondDate = new Date(dayRecord.attStartDate);
    //   console.log(secondDate);
    firstDate.setHours(firstDate.getHours() + 5);
    firstDate.setMinutes(firstDate.getMinutes() + 31);
    firstDate.setSeconds(firstDate.getSeconds() - 59);
    let tempfirstDate = moment(firstDate).format('MM/DD/YYYY');
    let tempsecondDate = moment(secondDate).format('MM/DD/YYYY');

    if (tempfirstDate == tempsecondDate) {
      // var isEqualData = this.attendanceCal.checkIfDatesAreEqualSimple(
      //   firstDate,
      //   secondDate
      // );
      // console.log();
      // if (isEqualData) {
      var shortfallHrs;
      if (dayRecord.actualTime == 0 && dayRecord.shiftTime == 0) {
        shortfallHrs = 0;
        this.shortfallHrs.emit(shortfallHrs);
      } else {
        var totalHrs = parseFloat(dayRecord.shiftTime);
        var workedHrs = parseFloat(dayRecord.actualTime);
        var difference = totalHrs - workedHrs;
        if (difference < 0) {
          shortfallHrs = 0;
          this.shortfallHrs.emit(shortfallHrs);
        } else {
          shortfallHrs = this.attendanceCal.time_convert(difference);
          this.shortfallHrs.emit(shortfallHrs);
        }
      }
    }
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return this.selectedDate === moment(date).format('DD/MM/YYYY');
  }

  public prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.attendanceCal.generateCalendar(this.currentDate, this.dataFlag); // calendar will be generated
    // this.performCalendarAction();
  }

  public nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.attendanceCal.generateCalendar(this.currentDate, this.dataFlag); // calendar will be generated
    // this.performCalendarAction();
  }

  public isDisabledMonth(currentDate): boolean {
    const today = moment();
    return moment(currentDate).isBefore(today, 'months');
  }

  public isSelectedMonth(date: moment.Moment): boolean {
    const today = moment();
    return (
      moment(date).isSame(this.currentDate, 'month') &&
      moment(date).isSameOrBefore(today)
    );
  }

  public selectDate(dateObj: CalendarDate, opr) {
    if (opr) {
      const dialogRef = this.dialog.open(CalActionPopupComponent, {
        width: '450px',
        height: '350px',
        data: { dateClicked: dateObj.mDate },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    }
    this.selectedDate = moment(dateObj.mDate).format('DD/MM/YYYY');
    this.attendanceCal.generateCalendar(this.currentDate, this.dataFlag); // calendar will be generated
    this.performCalendarAction();
  }
  public selectDateMyShift(dateObj: CalendarDate, opr, myshiftFlag) {
    let today = new Date();
    let rangeDate = dateObj.mDate.toDate();
    let sixty_days_ago = new Date().setDate(today.getDate() - 60);
    let sixty_days_later = new Date().setDate(today.getDate() + 60);

    let result = isWithinInterval(rangeDate, {
      start: sixty_days_ago,
      end: sixty_days_later,
    });

    console.log('result' + result);

    if (opr && myshiftFlag == true && result) {
      const dialogRef = this.dialog.open(ShiftChangeModalComponent, {
        width: '500px',
        height: '500px',
        data: { dateClicked: dateObj },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if (result) {
          this.updateShiftChange.emit();
        }
      });
    } else if (result == false) {
      this.modalService.showMessage(
        'Change is allowed only for previous two months from now or future two months',
        'Error',
        'error-icon',
        'CLOSE'
      );
    } else {
      // do nothing
    }
    this.attendanceCal.generateCalendar(this.currentDate, this.dataFlag); // calendar will be generated
    this.performCalendarAction();
  }

  public isDayBeforeLastSat(date: moment.Moment): boolean {
    const lastSat = moment().weekday(-1);
    return moment(date).isSameOrBefore(lastSat);
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

//for attendance detail popup
export interface DialogData {
  dateClicked: any;
}

// store calendate with its details of attendance
export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
  actualIn: string;
  actualOut: string;
  shiftStartTime: string;
  attCategory: string;
  attStatus: string;
  shiftEndTime: string;
  shiftType: string;
  actualTime: boolean;
  shiftTime: string;
  colorCode: number;
  holidayDesc: string;
  isFuture: string;
  isLeave: string;
  leaveStatus: string;
  leaveApplied: string;
  isRegularize: string;
  regStatus: string;
}
