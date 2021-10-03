import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import * as moment from 'moment';
import {
  AttendanceCalendarComponent,
  DialogData,
} from '../calendar/attendance-calendar/attendance-calendar.component';
import { LeaveAndAttendanceRootService } from '../../leave-and-attendance-root.service';
import {
  FormGroup,
  FormControl,
  FormControlName,
  Validators,
} from '@angular/forms';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { AttendanceCalendarService } from '../calendar/attendance-calendar.service';
import { CalActionPopupComponent } from '../cal-action-popup/cal-action-popup.component';
import { CalendarListViewComponent } from '../calendar/calendar-list-view/calendar-list-view.component';
import { Config } from 'src/app/components/core/config/config';
import { config, Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-regularize-modal',
  templateUrl: './regularize-modal.component.html',
  styleUrls: ['./regularize-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegularizeModalComponent implements OnInit {
  reasons: any;
  actualIn: any;
  actualOut: any;
  shiftStartTime: any;
  shiftEndTime: any;
  date: any;
  reasonList: any = [];
  regularizeForm: FormGroup;
  selectedDayDetails: any;
  reg_in: any;
  reg_out: any;
  shortfallHrs: number;
  calendarViewFlag: string;
  subscription: Subscription[] = [];
  constructor(
    private messageModalService: MessageModalService,
    public AttendanceComponent: CalendarListViewComponent,
    public calendarComponent: AttendanceCalendarComponent,
    public dialogRef: MatDialogRef<AttendanceCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    public leaveservice: LeaveAndAttendanceRootService,
    public attendanceCalService: AttendanceCalendarService
  ) {}

  ngOnInit(): void {
    this.date = new Date(this.data.dateClicked.selectedDate);
    this.selectedDayDetails = this.data.dateClicked.data;
    this.calendarViewFlag = this.data.dateClicked.flag;
    this.subscription.push(
      this.leaveservice.getReguReasons().subscribe((res) => {
        this.reasons = res;
        for (let each of this.reasons) this.reasonList.push(each['reason']);
      })
    );
    console.log('dayDetails', this.selectedDayDetails);
    this.populateRegInandRegOut(this.selectedDayDetails);
    let formattedRegInTime = this.attendanceCalService.formatInOutTime(
      this.reg_in
    );

    let formattedRegOutTime = this.attendanceCalService.formatInOutTime(
      this.reg_out
    );
    this.regularizeForm = new FormGroup({
      reason: new FormControl('', [Validators.required]),
      remarks: new FormControl(''),
      regIn: new FormControl(formattedRegInTime, [Validators.required]),
      regOut: new FormControl(formattedRegOutTime, [Validators.required]),
    });
    this.actualIn = this.attendanceCalService.formatInOutTime(
      this.selectedDayDetails.actualIn
    );
    this.actualOut = this.attendanceCalService.formatInOutTime(
      this.selectedDayDetails.actualOut
    );
    this.shiftStartTime = this.attendanceCalService.formatInOutTime(
      this.selectedDayDetails.shiftStartTime
    );
    this.shiftEndTime = this.attendanceCalService.formatInOutTime(
      this.selectedDayDetails.shiftEndTime
    );
  }
  dismiss() {
    this.dialogRef.close();
  }
  //setting initial recommended values of regIn and regOut
  populateRegInandRegOut(dayData) {
    this.reg_in = dayData.shiftStartTime;
    this.reg_out = dayData.shiftEndTime;
  }
  regInTimestamp() {
    this.reg_in = new Date(this.selectedDayDetails['attStartDate']).setUTCHours(
      this.regularizeForm.value['regIn'].split(':')[0],
      this.regularizeForm.value['regIn'].split(':')[1],
      0
    );
    this.selectedDayDetails['regIn'] = this.reg_in;
  }
  regOutTimestamp() {
    this.reg_out = new Date(
      this.selectedDayDetails['attStartDate']
    ).setUTCHours(
      this.regularizeForm.value['regOut'].split(':')[0],
      this.regularizeForm.value['regOut'].split(':')[1],
      0
    );
    this.reg_out =
      this.reg_out < this.reg_in
        ? this.reg_out + 24 * 60 * 60 * 1000
        : this.reg_out;
    this.selectedDayDetails['regOut'] = this.reg_out;
  }
  applyClicked(form) {
    if (this.reg_out - this.reg_in < 300000) {
      this.messageModalService.showMessage(
        'Difference between in and out should be equal or more than 5 minutes',
        'Error',
        'warning-icon',
        'CLOSE'
      );
    } else {
    //   this.selectedDayDetails.attStartDate =
    //     this.selectedDayDetails.attStartDate + Config.timezoneOffset;
    //   this.selectedDayDetails.actualIn =
    //     this.selectedDayDetails.actualIn + Config.timezoneOffset;
    //   this.selectedDayDetails.actualOut =
    //     this.selectedDayDetails.actualOut + Config.timezoneOffset;
    //   this.reg_in = this.reg_in + Config.timezoneOffset;
    //   this.reg_out = this.reg_out + Config.timezoneOffset;
     let attStartDate = JSON.parse(
        JSON.stringify(this.selectedDayDetails.attStartDate)
      );
      attStartDate = attStartDate + Config.timezoneOffset;
      let actualIn = JSON.parse(
        JSON.stringify(this.selectedDayDetails.actualIn)
      );
      actualIn = actualIn + Config.timezoneOffset;
      let actualOut = JSON.parse(
        JSON.stringify(this.selectedDayDetails.actualOut)
      );
      actualOut = actualOut + Config.timezoneOffset;
      let reg_in =JSON.parse( JSON.stringify(this.reg_in));
      reg_in = reg_in + Config.timezoneOffset;
      let reg_out = JSON.parse(JSON.stringify(this.reg_out));
      reg_out = reg_out + Config.timezoneOffset;

      // this.selectedDayDetails.attStartDate = new Date(time);
      let payload = [
        {
          regReason: form['reason'],
          remark: form['remarks'],
          workDate: attStartDate,
          actualIn: actualIn,
          actualOut: actualOut,
          regIn: this.reg_in,
          regOut: this.reg_out,
          regIn2: '',
          regOut2: '',
          regReason2: '',
          remark2: '',
          shortfallHrs: this.shortfallHrs ? this.shortfallHrs : 0,
          willRegularise: true,
        },
      ];
      this.leaveservice.saveRegularization(payload).subscribe((res) => {
        let data = res[0];
        if (data['requestStatus'] == 'SUCCESS') {
          this.messageModalService.showMessage(
            'Request saved successfully',
            'Success',
            'success-icon',
            'CLOSE'
          );
          this.dialogRef.close();
          console.log(
            String(this.date.getMonth() + 1) + String(this.date.getFullYear())
          );
          delete this.attendanceCalService.cachedAttDetail[
            String(this.date.getMonth() + 1) + String(this.date.getFullYear())
          ];
          this.attendanceCalService.generateCalendar(this.date, true);
        } else if (data['requestStatus'] == 'FAILED') {
          this.messageModalService.showMessage(
            data['systemErrMsg'],
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      });
    }
  }
}
