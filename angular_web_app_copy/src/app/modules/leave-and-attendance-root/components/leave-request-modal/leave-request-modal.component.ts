import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LeaveAndAttendanceRootService } from '../../leave-and-attendance-root.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  FormControl,
  FormGroup,
  FormControlName,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApplyLeaveService } from 'src/app/components/shared/apply-leaves/apply-leave.service';
import * as moment from 'moment';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { Subscription } from 'rxjs';
import { AttendanceCalendarComponent } from '../calendar/attendance-calendar/attendance-calendar.component';
import { ApplyLeaveConstants } from 'src/app/components/shared/apply-leaves/apply-leave.constants';
import { CalendarListViewComponent } from '../calendar/calendar-list-view/calendar-list-view.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { AttendanceCalendarService } from '../calendar/attendance-calendar.service';
@Component({
  selector: 'app-leave-request-modal',
  templateUrl: './leave-request-modal.component.html',
  styleUrls: ['./leave-request-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LeaveRequestModalComponent implements OnInit {
  leaveList: any = [];
  @Input() flag;
  @Input() selectedDate;
  leaveData: any;
  fileAttached: boolean = false;
  selectedReason: string = '';
  reasons = ['Personal', 'Travel', 'Medical', 'Others'];
  leaveSelected: string;
  minDate: Date;
  maxDate: Date;
  checkFlag: boolean = false;
  attach: boolean = false;
  remarks: string;
  halfDayFlag: boolean = false;
  halfDayOption: boolean = false;
  singleDay: boolean = true;
  shiftDetailsObj: any;
  leaveForm: FormGroup;
  shiftFirstHalf: any;
  shiftSeconsHalf: any;
  fileName: string;
  halfDayObject: any = {
    halfDayStartTime: '',
    halfDayEndTime: '',
  };
  isShiftApplicable: boolean = false;
  isShiftUser: boolean = false;
  remarksEnabled: boolean = false;
  File: File;
  subscription: Subscription[] = [];

  constructor(
    private messageModalService: MessageModalService,
    public AttendanceComponent: CalendarListViewComponent,
    private service: ApplyLeaveService,
    public attendanceCalService: AttendanceCalendarService,
    public dialog: MatDialog,
    private leaveservice: LeaveAndAttendanceRootService,
    public dialogRef: MatDialogRef<LeaveRequestModalComponent>,
    public calendarComponent: AttendanceCalendarComponent
  ) {}

  ngOnInit(): void {
    this.getShiftDetailSet();
    this.service.getLeavesBalance().subscribe((response) => {
      if (response) {
        for (let d in response) {
          if (response[d].leaveCode != '0500') {
            this.leaveList.push(response[d]);

            this.leaveList.forEach((element) => {
              element.dispalyBal = element.balance;
              if (
                ApplyLeaveConstants.dontShowLeftLeaveCodeArray.includes(
                  element.leaveCode
                )
              ) {
                element.dispalyBal = 0;
              }
            });
          }
        }
      }
    });

    // this.leaveList = this.service.leave_balance;
    this.leaveForm = new FormGroup({
      fDate: new FormControl(new Date(this.selectedDate), [Validators.required]),
      tDate: new FormControl(new Date(this.selectedDate), [Validators.required]),
      remarks: new FormControl('', [Validators.maxLength(50)]),
      leaveSelected: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      attachment: new FormControl(''),
    });
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.halfDayFlag = false;
    if (type == 'fromDate') {
      this.minDate = new Date(event.value);
    } else this.maxDate = new Date(event.value);
  }
  reasonSelected(event) {
    // this.checkFlag = false;
    this.remarksEnabled = event.value == 'Others' ? true : false;
    this.remarksEnabled
      ? this.leaveForm.get('remarks').setValidators(Validators.required)
      : this.leaveForm.get('remarks').clearValidators();
    this.leaveForm.get('remarks').updateValueAndValidity();
  }
  onShiftChange(code) {
    if (code == '01') {
      this.halfDayObject['halfDayStartTime'] = this.shiftDetailsObj['zbeg1'];
      this.halfDayObject['halfDayEndTime'] = this.shiftDetailsObj['zend1'];
    } else {
      this.halfDayObject['halfDayStartTime'] = this.shiftDetailsObj['zbeg2'];
      this.halfDayObject['halfDayEndTime'] = this.shiftDetailsObj['zend2'];
    }
  }
  dismiss() {
    this.dialogRef.close();
  }
  applyLeave(form) {
    let leaveObj = [
      {
        halfDayCheck: this.halfDayFlag,
        halfDayFlag: this.halfDayFlag,
        halfDayStartTime:
          this.halfDayFlag && this.isShiftUser
            ? this.halfDayObject['halfDayStartTime']
            : '',
        halfDayEndTime:
          this.halfDayFlag && this.isShiftUser
            ? this.halfDayObject['halfDayEndTime']
            : '',
        leaveCode: this.leaveData.leaveCode,
        leaveStartDate: new Date(
          moment(form['fDate']).format('MM/DD/YYYY')
        ).getTime(),
        leaveEndDate: new Date(
          moment(form['tDate']).format('MM/DD/YYYY')
        ).getTime(),
        leavePlanHrs: this.halfDayFlag ? '4.50' : '0.00',
        leaveBalance: this.leaveData.balance,
        remark: form['reason'] ,
      },
    ];
    if (this.attach && this.fileAttached) {
      leaveObj[0]['attachFlag'] = this.attach;
      this.subscription.push(
        this.leaveservice
          .uploadAttachment(this.File, leaveObj)
          .subscribe((res) => {
            let data = res[0];
            this.dialogRef.close();
            if (data['requestStatus'] == 'SUCCESS') {
              this.messageModalService.showMessage(
                'Request saved successfully',
                'Success',
                'success-icon',
                'CLOSE'
              ); delete this.attendanceCalService.cachedAttDetail[
                String(new Date(this.leaveForm.value['fDate']).getMonth() + 1) +
                  String(new Date(this.leaveForm.value['fDate']).getFullYear())
              ];
              this.attendanceCalService.generateCalendar(
                new Date(this.leaveForm.value['fDate']),
                true
              );
            } else {
              this.messageModalService.showMessage(
                data['systemErrMsg'],
                'Error',
                'warning-icon',
                'CLOSE'
              );
            }
          })
      );
    } else
      this.subscription.push(
        this.leaveservice.applyLeave(leaveObj).subscribe((res) => {
          let data = res[0];
          if (data['requestStatus'] == 'SUCCESS') {
            this.messageModalService.showMessage(
              'Successfully updated',
              'Success',
              'success-icon',
              'CLOSE'
            );
            this.dialogRef.close();
            delete this.attendanceCalService.cachedAttDetail[
              String(new Date(this.leaveForm.value['fDate']).getMonth() + 1) +
                String(new Date(this.leaveForm.value['fDate']).getFullYear())
            ];
            this.attendanceCalService.generateCalendar(
              new Date(this.leaveForm.value['fDate']),
              true
            );
          } else if (data['requestStatus'] == 'FAILED') {
            this.messageModalService.showMessage(
              data['systemErrMsg'],
              'Error',
              'warning-icon',
              'CLOSE'
            );
          }
        })
      );
  }
  fileAttachFlag(event) {
    // this.leaveForm
    //   .get('attachment')
    //   .setValue('', { emitModelToViewChange: false });
    // this.leaveForm.get('attachment').updateValueAndValidity();
    // this.fileAttached = false;
    // this.File = null;
    this.checkFlag = false;
    this.leaveData = event.value;
    this.attach = event.value['attachFlag'];
    // this.attach && !this.sickLeaveAttachFlag
    //   ? this.leaveForm.get('attachment').setValidators(Validators.required)
    //   : this.leaveForm.get('attachment').clearValidators();
    // this.leaveForm.get('attachment').updateValueAndValidity();

    this.leaveData['halfDayFlag']
      ? (this.halfDayOption = true)
      : ((this.halfDayOption = false), this.halfDay(false));
  }
  onAttachFile(event) {
    if (event.target.files[0].name.split('.')[1] == 'pdf') {
      this.fileAttached = true;
      this.File = event.target.files[0];
      this.fileName = this.File.name;
      this.leaveForm
        .get('attachment')
        .setValue(this.File.name, { emitModelToViewChange: false });
      this.leaveForm.get('attachment').updateValueAndValidity();
      event.target.value = null;
    } else {
      this.messageModalService.showMessage(
        'File should have .pdf extension',
        'Error',
        'warning-icon',
        'CLOSE'
      );
    }
  }
  halfDay(event) {
    this.checkFlag = event;
    this.halfDayFlag = event;
    this.onShiftChange('01');
  }

  getShiftDetailSet() {
    this.subscription.push(
      this.leaveservice
        .getShiftDetailSet(
          moment(new Date(this.selectedDate)).format('yyyy-MM-DD')
        )
        .subscribe((resultArray) => {
          this.shiftDetailsObj = resultArray;
          (this.shiftFirstHalf =
            moment(new Date(this.shiftDetailsObj['zbeg1'])).format('HH:mm') +
            '-' +
            moment(new Date(this.shiftDetailsObj['zend1'])).format('HH:mm')),
            (this.shiftSeconsHalf =
              moment(new Date(this.shiftDetailsObj['zbeg2'])).format('HH:mm') +
              '-' +
              moment(new Date(this.shiftDetailsObj['zend2'])).format('HH:mm'));
          this.isShiftApplicable =
            this.shiftDetailsObj.fhshHide == null ? false : true;
          this.isShiftUser = this.shiftDetailsObj.fhshHide == '' ? true : false;
        })
    );
  }
  ngOnDestroy() {
    if (this.subscription.length > 0) {
      this.subscription.forEach((s) => s.unsubscribe());
    }
  }
}
