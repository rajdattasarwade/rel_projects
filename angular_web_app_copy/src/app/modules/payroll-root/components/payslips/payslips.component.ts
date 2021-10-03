import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PayrollService } from '../../payroll.service';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { getYear } from 'date-fns';

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.component.html',
  styleUrls: ['./payslips.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PayslipsComponent implements OnInit {
  @ViewChild('picker') datepicker: MatDatepicker<any>;
  url = 'assets/Payslip202006.pdf';
  today = new Date();
  pdfUrl: string;
  file: any;
  monthNames = new Array(
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  );
  selectedMonth: any;
  months = [];
  fileName: string;
  dateSelected;

  monthsReverse = new Array('');
  public doughnutChartLabels: string[] = [
    'Gross Earnings',
    'Net Pay',
    'Deductions',
  ];
  // public doughnutChartData: MultiDataSet = [[100000, 30000]];
  public doughnutChartData: MultiDataSet[] = [];
  public doughnutChartType: ChartType = 'doughnut';

  public colors: any = [{ backgroundColor: ['#60A058', '#5B8EDE', '#ED544E'] }];
  public doughnutChartOptions1: any = {
    legend: {
      display: false,
    },
    showTooltips: false,
    cutoutPercentage: 60,
  };
  payslipResult = [];
  payslipSubscription: Subscription[] = [];
  selectedYear: any;
  deductionPercent: number;
  grossEarningPercent: number;
  constructor(private payslipService: PayrollService, private router: Router) {}

  ngOnInit(): void {
    this.today.setDate(1);
    this.selectedMonth = this.today.getMonth();
    this.selectedYear = this.today.getFullYear();
    this.getPayslipData(this.selectedYear, this.selectedMonth);
  }

  viewOrDownload(str, year, month) {
    let pdfDataSubscription = this.payslipService
      .getPDFbyYear(year, month)
      .subscribe(
        (data) => {
          if (data) {
            this.file = new Blob([data], { type: 'application/pdf' });
            this.pdfUrl = URL.createObjectURL(this.file);
            this.payslipService.setDates = {
              selectedYear: this.selectedYear,
              selectedMonth: this.selectedMonth,
            };
            if (str == 'view')
              this.router.navigate(['/payroll/view-payslip', this.pdfUrl]);
            else {
              var fileLink = document.createElement('a');
              fileLink.href = this.pdfUrl;
              let DisplayYear;
              let DisplayMonth;
              for (let i = 0; i < this.payslipResult.length; i++) {
                if (this.pdfUrl != null) {
                  DisplayYear = this.selectedYear;
                  DisplayMonth = this.monthNames[this.selectedMonth - 1];
                }
              }
              fileLink.download =
                'Payslip' + ' ' + DisplayMonth + ',' + DisplayYear;

              fileLink.click();
              // window.open(this.pdfUrl);
            }
          } else {
            this.pdfUrl = null;
          }
        },
        (error) => {
          this.pdfUrl = null;
        }
      );
    this.payslipSubscription.push(pdfDataSubscription);
  }
  chosenYearHandler(event) {
    var result = getYear(new Date(event));
    this.selectedYear = result;
    this.datepicker.close();
    this.getPayslipData(this.selectedYear, this.selectedMonth);
  }
  navigateToPrevMonth() {
    this.doughnutChartData = [];
    this.selectedMonth -= 1;
    if (this.selectedMonth <= 0) {
      this.selectedMonth += 12;
      this.selectedYear -= 1;
    }
    console.log(this.selectedMonth);
    console.log(this.selectedYear);
    this.getPayslipData(this.selectedYear, this.selectedMonth);
  }
  navigateToNextMonth() {
    this.doughnutChartData = [];
    this.selectedMonth += 1;
    if (this.selectedMonth > 12) {
      this.selectedMonth -= 12;
      this.selectedYear += 1;
    }
    this.getPayslipData(this.selectedYear, this.selectedMonth);
  }

  getPayslipData(year, month) {
    let monthNo = month && month < 10 && month > 0 ? '0' + month : month;
    let payslipDataSubscription = this.payslipService
      .getpayslipData(year, monthNo)
      .subscribe(
        (data) => {
          if (data != '') {
            this.payslipResult[month] = data;
            if (
              this.payslipResult[month].grossEarning != null &&
              this.payslipResult[month].grossEarning != 0
            ) {
              this.doughnutChartData = [
                this.payslipResult[month].grossEarning,
                this.payslipResult[month].netPay,
                this.payslipResult[month].deduction,
              ];
            } else {
              this.payslipResult[month] = null;
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    this.payslipSubscription.push(payslipDataSubscription);
  }

  ngOnDestroy() {
    this.payslipSubscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
