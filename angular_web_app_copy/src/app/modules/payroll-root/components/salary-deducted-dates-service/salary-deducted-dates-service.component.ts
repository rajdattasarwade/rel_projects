import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalaryDeductedDateModalComponent } from './salary-deducted-date-modal/salary-deducted-date-modal.component';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { PayrollService } from '../../payroll.service';
import { AttendanceCalendarService } from 'src/app/modules/leave-and-attendance-root/components/calendar/attendance-calendar.service';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { MatTableDataSource } from '@angular/material/table';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-salary-deducted-dates-service',
  templateUrl: './salary-deducted-dates-service.component.html',
  styleUrls: ['./salary-deducted-dates-service.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },

  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SalaryDeductedDatesServiceComponent implements OnInit, OnDestroy {
  breadcrumbJson: any = [
    {
      label: 'Payroll',
      link: '/payroll'
    },
    {
      label: 'Salary Deducated & Payback Date',
      link: '/payroll/salary-deducted-payback'
    }
  ];
  displayedColumns: string[] = ['date', 'days'];
  salaryDeductData: any = []
  paybackData: any = []
  salaryDate: any = []
  sddLength: number = 0
  pbdLength: number = 0
  minDate: any;
  subscription: Subscription[] = [];
  public currentDate: moment.Moment;
  date = new FormControl(moment());
  lastMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 2,
    new Date().getDate()
  );
  constructor(public dialog: MatDialog,
    private payrollService: PayrollService,
    private attendanceCal: AttendanceCalendarService,
    private messageModalService: MessageModalService) { }

  ngOnInit(): void {
    this.currentDate = moment().subtract(1, 'months');
    this.date.setValue(this.currentDate)
    this.minDate = moment().subtract(3, 'months');
    let dateString = Date.parse(this.currentDate.toString())
    this.getSalaryDeductDates(dateString)
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.sddLength = 0
    this.pbdLength = 0
    this.salaryDeductData = []
    this.paybackData = []
    this.currentDate = moment(normalizedMonth)
    if (this.currentDate > moment()) {
      this.dataUnavailability()
    }
    else {
      this.getSalaryDeductDates(Date.parse(this.currentDate.toString()))
    }
  }
  getSalaryDeductDates(date) {
    this.salaryDeductData = []
    this.paybackData = []
    this.sddLength = 0
    this.pbdLength = 0
    this.subscription.push(this.payrollService.getSalaryDeductData(date).subscribe((response) => {
    if (response.length > 0) {
      this.salaryDate = response
      this.sortByKey(this.salaryDate, 'date')
      let sddData = []
      let pbdData = []
      for (let item of this.salaryDate) {
        item.date = parseInt(item.date.match(/\d/g).join(''), 10).toString()
        if (new Date(Number(item.date)) < this.lastMonth) {
          item.disablesddDate = true
        }
        else {
          item.disablesddDate = false
        }
        if (item.type == "SDD") {
          sddData.push(item)
          this.sddLength = this.sddLength + Number(item.days)
        }
        else {
          pbdData.push(item)
          this.pbdLength = this.pbdLength + Number(item.days)
        }
      }
      this.salaryDeductData = new MatTableDataSource(sddData)
      this.paybackData = new MatTableDataSource(pbdData)
    }
    else {
      this.dataUnavailability()
    }
    }))
  }
  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
  public prevMonth(): void {
    if (this.currentDate <= moment().add(1, 'months')) {
      if (this.currentDate >= this.minDate) {
        this.currentDate = moment(this.currentDate).subtract(1, 'months');
        this.getSalaryDeductDates(Date.parse(this.currentDate.toString()))
        this.date.setValue(this.currentDate)
      }
    }
    else {
      this.salaryDeductData = []
      this.paybackData = []
      this.sddLength = 0
      this.pbdLength = 0
      this.currentDate = moment(this.currentDate).subtract(1, 'months');
      this.date.setValue(this.currentDate)
      this.dataUnavailability()
    }
  }

  public nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.date.setValue(this.currentDate)
    if (this.currentDate <= moment()) {
      this.getSalaryDeductDates(Date.parse(this.currentDate.toString()))
    }
    else {
      this.salaryDeductData = []
      this.paybackData = []
      this.sddLength = 0
      this.pbdLength = 0
      this.dataUnavailability()
    }
  }
  dataUnavailability() {
    this.messageModalService.showMessage(
      'Data not processed for the selected period',
      'Error',
      'warning-icon',
      'CLOSE',
    );
  }

  getAttendanceDetails(date, event) {
    event.preventDefault();
    var month = new Date(Number(date)).getMonth() + 1
    var year = new Date(Number(date)).getFullYear()
    this.subscription.push(this.attendanceCal.getAttendanceDetails(month, year).subscribe((data: any) => {
      for (let item of data) {
        if (item.attStartDate == date) {
          this.payrollService.getCachedAttendance(item)
          this.openSalaryDeducatedModal()
        }
      }
    }))
  }

  openSalaryDeducatedModal() {
    const dialogRef = this.dialog.open(SalaryDeductedDateModalComponent, {
      width: '600px',
    });
  }
  ngOnDestroy() {
    if (this.subscription.length > 0) {
      this.subscription.forEach((s) => s.unsubscribe());
    }
  }
}
