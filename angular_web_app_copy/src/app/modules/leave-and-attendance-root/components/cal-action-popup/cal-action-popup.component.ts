import { Component, OnInit, Inject } from '@angular/core';
import {
  AttendanceCalendarComponent,
  DialogData,
} from '../calendar/attendance-calendar/attendance-calendar.component';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import * as moment from 'moment';
import { AttendanceCalendarService } from '../calendar/attendance-calendar.service';
import addDays from 'date-fns/addDays';
import isEqual from 'date-fns/isEqual';
import { Router } from '@angular/router';
import subDays from 'date-fns/subDays';
import isLastDayOfMonth from 'date-fns/isLastDayOfMonth';
import isFirstDayOfMonth from 'date-fns/isFirstDayOfMonth';
import { getWeekYearWithOptions } from 'date-fns/fp';
import { LeaveRequestModalComponent } from '../leave-request-modal/leave-request-modal.component';
import { LeaveAndAttendanceRootService } from '../../leave-and-attendance-root.service';
import { ApplyLeaveService } from 'src/app/components/shared/apply-leaves/apply-leave.service';
import { RegularizeModalComponent } from '../regularize-modal/regularize-modal.component';
import { Config } from 'src/app/components/core/config/config';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-cal-action-popup',
  templateUrl: './cal-action-popup.component.html',
  styleUrls: ['./cal-action-popup.component.css'],
})
export class CalActionPopupComponent implements OnInit {
  dateHeader: any;
  popUpDetail: any;
  punchIn: any;
  punchOut: any;
  status: any;
  shiftType: any;
  defaultShiftStartTime: any;
  defaultShiftEndTime: any;
  actualHrsCompleted: any;
  defaultHrs: any;
  disableNextBtn: boolean = false;
  disablePrevBtn: boolean = false;
  dayData;
  regulariseDisable: boolean = false;
  regulariseDisableFlag: string;
  any;

  constructor(
    private messageModalService: MessageModalService,
    public dialogRef: MatDialogRef<AttendanceCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    public leaveAttendanceService: LeaveAndAttendanceRootService,
    public attendanceCalService: AttendanceCalendarService,
    public router: Router,
    public leavesService: ApplyLeaveService
  ) {}

  ngOnInit(): void {
    this.regulariseDisable =
      new Date(this.data.dateClicked).getTime() <
      new Date(new Date().setHours(0) + Config.timezoneOffset).getTime()
        ? true
        : false;
    this.regulariseDisable
      ? ''
      : document.getElementById('regularise').remove();
    console.log('date', this.regulariseDisable);
    this.dateHeader = moment(this.data.dateClicked).format('DD MMMM YYYY');
    var month = moment(this.data.dateClicked).format('DD/M/YYYY').split('/')[1];
    var year = moment(this.data.dateClicked).format('DD/M/YYYY').split('/')[2];
    this.getBasicDayDetails(month, year, this.dateHeader);
    this.isFirstDay();
    this.isLastDay();
  }

  getBasicDayDetails(month, year, dateData) {
    var currentMnthDet = this.attendanceCalService.cachedAttDetail[
      month + year
    ];
    currentMnthDet.forEach((dayRecord) => {
      var isEqualData = isEqual(
        new Date(
          parseInt(
            moment(dayRecord.attStartDate).format('D/M/YYYY').split('/')[2]
          ),
          parseInt(
            moment(dayRecord.attStartDate).format('D/M/YYYY').split('/')[1]
          ),
          parseInt(
            moment(dayRecord.attStartDate).format('D/M/YYYY').split('/')[0]
          ),
          0,
          0,
          0,
          0
        ),
        new Date(
          parseInt(moment(dateData).format('D/M/YYYY').split('/')[2]),
          parseInt(moment(dateData).format('D/M/YYYY').split('/')[1]),
          parseInt(moment(dateData).format('D/M/YYYY').split('/')[0]),
          0,
          0,
          0,
          0
        )
      );
      // TODO::::: this condition needs to be changed
      if (isEqualData) {
        this.dayData = dayRecord;
        this.punchIn = this.attendanceCalService.formatInOutTime(
          dayRecord.actualIn
        ); // default shift in time
        this.punchOut = this.attendanceCalService.formatInOutTime(
          dayRecord.actualOut
        ); // default shift out time
        this.status = dayRecord.attStatus; //wo, prs/oph/cl/abs(codes)
        this.defaultShiftStartTime = this.attendanceCalService.formatInOutTime(
          dayRecord.shiftStartTime
        ); // default start time
        this.defaultShiftEndTime = this.attendanceCalService.formatInOutTime(
          dayRecord.shiftEndTime
        ); // default end time
        this.shiftType = dayRecord.shiftType; // FX9/Off etc
        this.actualHrsCompleted =
          dayRecord.actualTime != 0
            ? this.attendanceCalService.formatActualInAndDefaultHrs(
                dayRecord.actualTime
              )
            : 0; //total hrs covered by user
        this.defaultHrs =
          dayRecord.shiftTime != 0
            ? this.attendanceCalService.formatActualInAndDefaultHrs(
                dayRecord.shiftTime
              )
            : 0; // default shift hrs for user
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  navigateToNextDay() {
    this.disablePrevBtn = false;
    this.dateHeader = addDays(
      new Date(
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[0]),
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[1]) - 1,
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[2])
      ),
      1
    );
    this.isLastDay();
    this.dateHeader = moment(this.dateHeader).format('DD MMMM YYYY');
    this.getBasicDayDetails(
      moment(this.dateHeader).format('YYYY/M/D').split('/')[1],
      moment(this.dateHeader).format('YYYY/M/D').split('/')[0],
      this.dateHeader
    );
  }

  isLastDay() {
    var isLastDay = isLastDayOfMonth(
      new Date(
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[0]),
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[1]) - 1,
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[2])
      )
    );
    if (isLastDay) {
      this.disableNextBtn = true;
    } else {
      this.disableNextBtn = false;
    }
  }

  navigateToPrevDay() {
    this.disableNextBtn = false;
    this.dateHeader = subDays(
      new Date(
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[0]),
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[1]) - 1,
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[2])
      ),
      1
    );
    this.isFirstDay();
    this.dateHeader = moment(this.dateHeader).format('DD MMMM YYYY');
    this.getBasicDayDetails(
      moment(this.dateHeader).format('YYYY/M/D').split('/')[1],
      moment(this.dateHeader).format('YYYY/M/D').split('/')[0],
      this.dateHeader
    );
  }

  isFirstDay() {
    var isFirstDay = isFirstDayOfMonth(
      new Date(
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[0]),
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[1]) - 1,
        parseInt(moment(this.dateHeader).format('YYYY/M/D').split('/')[2])
      )
    );
    if (isFirstDay) {
      this.disablePrevBtn = true;
    } else {
      this.disablePrevBtn = false;
    }
  }

  routeToLeavePopup() {
    this.leaveAttendanceService
      .getRegularizePopup(new Date(this.dateHeader).getTime())
      .subscribe((res) => {
        let data = res;
        if (data['messageStatus'] == '') {
          this.dialogRef.close();
          const dialogRef = this.dialog.open(LeaveRequestModalComponent, {
            width: '600px',
          });
          dialogRef.componentInstance.selectedDate = moment(
            new Date(this.dateHeader)
          );
          dialogRef.componentInstance.flag = 'grid';
        } else {
          this.messageModalService.showMessage(
            data['messageStatus'],
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      });
  }

  routeToRegularizePopUp() {
    this.leaveAttendanceService
      .getRegularizePopup(new Date(this.dateHeader).getTime())
      .subscribe((res) => {
        let data = res;
        if (data['messageStatus'] == '') {
          this.dialogRef.close();
          var dataObj = {
            data: this.dayData,
            selectedDate: moment(new Date(this.dateHeader)),
            flag: 'grid',
          };
          const dialogRef = this.dialog.open(RegularizeModalComponent, {
            width: '600px',
            data: { dateClicked: dataObj },
          });
        } else {
          this.messageModalService.showMessage(
            data['messageStatus'],
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      });
  }
}
