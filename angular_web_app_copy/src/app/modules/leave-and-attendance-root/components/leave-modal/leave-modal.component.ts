import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LeaveAndAttendanceRootService } from '../../leave-and-attendance-root.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { AttendanceCalendarService } from '../calendar/attendance-calendar.service';
import { MaternityModalComponent } from '../maternity-modal/maternity-modal.component';

@Component({
  selector: 'app-leave-modal',
  templateUrl: './leave-modal.component.html',
  styleUrls: ['./leave-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LeaveModalComponent implements OnInit {
  reasons = ['Personal', 'Travel', 'Medical', 'Others'];
  fileAttached: boolean = false;
  fileName: string;
  minDate: Date;
  maxDate: Date;
  @Input() leaveData;
  halfDayFlag: boolean = false;
  halfDayOption: boolean = false;
  shiftDetailsObj: any;
  shiftFirstHalf: any;
  shiftSeconsHalf: any;
  halfDayObject: any = {
    halfDayStartTime: '',
    halfDayEndTime: '',
  };
  isShiftApplicable: boolean = true;
  remarksEnabled: boolean = false;
  isShiftUser: boolean = false;
  attachFlag: boolean = false;
  singleDay: boolean = false;
  file: File;
  public leaveForm: FormGroup;
  subscription: Subscription[] = [];
  remarkAccess: boolean = false;
  constructor(
    private attendanceCalService: AttendanceCalendarService,
    private messageModalService: MessageModalService,
    private leaveservice: LeaveAndAttendanceRootService,
    public dialogRef: MatDialogRef<LeaveModalComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.attachFlag = this.leaveData['attachFlag'];
    this.getShiftDetailSet();
    this.leaveForm = new FormGroup({
      remark: new FormControl('', [Validators.maxLength(50)]),
      reason: new FormControl('', [Validators.required]),
      fDate: new FormControl(Date, [Validators.required]),
      tDate: new FormControl(Date, [Validators.required]),
      eddDate: new FormControl(''),
      attachment: new FormControl(''),
    });
    this.halfDayOption = this.leaveData['halfDayFlag'];
    if (this.leaveData.leaveCode == '0500') {
      this.leaveForm.get('eddDate').setValidators(Validators.required);
    }
  }
  reasonSelected(event) {
    this.remarksEnabled = event.value == 'Others' ? true : false;
    this.remarksEnabled
      ? this.leaveForm.get('remark').setValidators(Validators.required)
      : this.leaveForm.get('remark').clearValidators();
    this.leaveForm.get('remark').updateValueAndValidity();
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
        remark:  form['reason'] ,
      },
    ];
    if (this.attachFlag && this.fileAttached) {
      leaveObj[0]['attachFlag'] = this.attachFlag;
      this.subscription.push(
        this.leaveservice
          .uploadAttachment(this.file, leaveObj)
          .subscribe((res) => {
            let data = res[0];
            this.dialogRef.close();
            if (data['requestStatus'] == 'SUCCESS') {
              this.messageModalService.showMessage(
                'Request saved successfully',
                'Success',
                'success-icon',
                'CLOSE'
              );
              delete this.attendanceCalService.cachedAttDetail[
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
          this.dialogRef.close();
          if (data['requestStatus'] == 'SUCCESS') {
            this.messageModalService.showMessage(
              'Request saved successfully',
              'Success',
              'success-icon',
              'CLOSE'
            );
            delete this.attendanceCalService.cachedAttDetail[
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
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.halfDayFlag = false;
    if (type == 'fromDate') {
      this.minDate = new Date(event.value);
    } else this.maxDate = new Date(event.value);
    let form = this.leaveForm.value;
    if (
      moment(form['fDate']).format() != 'Invalid date' &&
      moment(form['tDate']).format() != 'Invalid date'
    ) {
      this.singleDay =
        new Date(moment(form['fDate']).format('MM/DD/YYYY')).getTime() ==
        new Date(moment(form['tDate']).format('MM/DD/YYYY')).getTime()
          ? true
          : false;
      //calculate if days are more than two
      let days =
        new Date(moment(form['tDate']).format('MM/DD/YYYY')).getTime() -
          new Date(moment(form['fDate']).format('MM/DD/YYYY')).getTime() >
        86400000;
      console.log('days', days);
      days && this.leaveData.attachFlag
        ? (this.leaveForm.get('attachment').setValidators(Validators.required),
          this.leaveForm.get('attachment').updateValueAndValidity())
        : (this.leaveForm.get('attachment').clearValidators(),
          this.leaveForm.get('attachment').updateValueAndValidity());
      // if (
      //   this.leaveData.attachFlag &&
      //   this.leaveData.leaveCode == '0200' &&
      //   this.isShiftUser
      // ) {
      //   console.log('2');

      // }
      // else {
      //   console.log('3');
      //   this.leaveForm.get('attachment').clearValidators();
      //   this.leaveForm.get('attachment').updateValueAndValidity();
      // }
    }
  }
  onAttachFile(event) {
    this.fileAttached = true;
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
    this.leaveForm
      .get('attachment')
      .setValue(this.fileName, { emitModelToViewChange: false });
    this.leaveForm.get('attachment').updateValueAndValidity();
    event.target.value = null;
  }
  halfDay(event) {
    this.halfDayFlag = event;
    this.onShiftChange('01');
  }
  getShiftDetailSet() {
    this.subscription.push(
      this.leaveservice
        .getShiftDetailSet(moment(new Date()).format('yyyy-MM-DD'))
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
          console.log('shiftUser', this.isShiftUser);
        })
    );
  }
  maternityLeave() {
    if (!this.minDate) {
      this.messageModalService.showMessage(
        'Select From Date first',
        'Error',
        'warning-icon',
        'CLOSE'
      );
    } else {
      const modalRef = this.dialog.open(MaternityModalComponent, {
        width: '550px',
        height: '350px',
      });
      modalRef.componentInstance.fromdate = this.minDate;
      modalRef.componentInstance.dismissCallback = (
        reason: any,
        edd: any,
        week: any
      ) => {
        if (week <= 8) {
          if (reason == 'OK') {
            this.remarksEnabled = true;
            this.leaveForm.get('eddDate').setValue(edd.format('DD/MM/YYYY'));
            this.leaveForm
              .get('remark')
              .setValue('Expected Delivery Date : ' + edd.format('DD.MM.YYYY'));
            this.remarkAccess = true;
            this.leaveForm.get('reason').clearValidators();
            this.leaveForm.get('remark').updateValueAndValidity();
            this.leaveForm.get('reason').updateValueAndValidity();
          }
        } else {
          this.remarksEnabled = false;
          this.leaveForm.get('eddDate').setValue('');
          this.leaveForm.get('remark').setValue('');
        }
      };
    }
  }
  ngOnDestroy() {
    if (this.subscription.length > 0) {
      this.subscription.forEach((s) => s.unsubscribe());
    }
  }
}
