import { Component, OnInit, Input } from '@angular/core';
import { PayrollService } from '../../../payroll.service';
import { AttendanceCalendarService } from 'src/app/modules/leave-and-attendance-root/components/calendar/attendance-calendar.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SalaryDeductedDatesServiceComponent } from '../salary-deducted-dates-service.component';
import { MatDialog } from '@angular/material/dialog';
import { LeaveRequestModalComponent } from 'src/app/modules/leave-and-attendance-root/components/leave-request-modal/leave-request-modal.component';
import { RegularizeModalComponent } from 'src/app/modules/leave-and-attendance-root/components/regularize-modal/regularize-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-salary-deducted-date-modal',
  templateUrl: './salary-deducted-date-modal.component.html',
  styleUrls: ['./salary-deducted-date-modal.component.css']
})
export class SalaryDeductedDateModalComponent implements OnInit {

  attendanceData: any = []
  shiftInTime: any;
  shiftOutTime: any;
  constructor(private payrollService: PayrollService,
    public dialog: MatDialog,
    private attendanceCal: AttendanceCalendarService,
    private router: Router,
    public dialogRef: MatDialogRef<SalaryDeductedDatesServiceComponent>,) { }

  ngOnInit(): void {
    this.attendanceData = this.payrollService.attenDanceData
    this.shiftInTime = this.attendanceCal.formatInOutTime(this.attendanceData.shiftStartTime)
    this.shiftOutTime=this.attendanceCal.formatInOutTime(this.attendanceData.shiftEndTime)
  }
  cancelClick() {
    this.dialogRef.close()
  }
  routeToLeavePopup() {
    this.cancelClick()
    const dialogRef = this.dialog.open(LeaveRequestModalComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.selectedDate = moment(this.attendanceData.attStartDate);
    dialogRef.componentInstance.flag = '';
  }

  routeToRegularizePopUp() {
    this.cancelClick()
    var dataObj = {
      data: this.attendanceData,
      selectedDate: this.attendanceData.attStartDate,
      flag: '',
    };
    const dialogRef = this.dialog.open(RegularizeModalComponent, {
      width: '600px',
      data: { dateClicked: dataObj },
    });
  }
}
