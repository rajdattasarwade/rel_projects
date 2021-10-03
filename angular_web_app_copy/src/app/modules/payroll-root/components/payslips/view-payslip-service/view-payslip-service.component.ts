import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { IconsModel } from '../../../../../components/common/common-models';
import {
  MultiDataSet,
  Label,
  Color,
  PluginServiceGlobalRegistrationAndOptions
} from 'ng2-charts';
import { PayrollService } from '../../../payroll.service';
import { Subscription } from 'rxjs';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import {
  MatDatepickerInputEvent,
  MatDatepicker
} from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import {
  EmailModalComponent,
  HrssEmailActions
} from '../../../../../components/shared/email-modal/email-modal.component';
import { getYear } from 'date-fns';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginLabels from 'chartjs-plugin-labels';
declare var jsCallbacks: any;
@Component({
  selector: 'view-payslip-service',
  templateUrl: './view-payslip-service.component.html',
  styleUrls: ['./view-payslip-service.component.css']
})
export class ViewPayslipServiceComponent implements OnInit {
  
  breadcrumbJson: any = [
    {
      label: 'Payroll',
      link: '/payroll'
    },
    {
      label: 'MY Regular Payslip',
      link: ''
    }
  ];
  @ViewChild('picker') datepicker: MatDatepicker<any>;
  pdfUrl: any;
  today = new Date();
  myDate;
  months = [];
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
  payslipResult = [];
  payslipSubscription: Subscription[] = [];
  public bankDetails: any;
  public payslip: any;
  month: any;
  emailId: string;
  year: any;
  monthNo: any;
  response: Object;
  icons: any;
  selectedMonth: any;
  selectedYear: any;
  selectedMonthName: string;
  constructor(
    private payslipService: PayrollService,
    private router: Router,
    public messageModalSrv: MessageModalService,
    private route: ActivatedRoute,
    public activeModal: MatDialog
  ) {
    this.icons = [];
    this.icons.push(new IconsModel('', '', 'header-ico mail_ico', 'mail'));
    this.icons.push(
      new IconsModel('', '', 'header-ico download_pdf_ico', 'download_pdf')
    );
  }

  ngOnInit(): void {
    this.getEmpBankDetails();
    this.today.setDate(1);
    this.myDate = new Date();
    let result = this.payslipService.getDates;
    this.selectedMonth = result.selectedMonth - 1;
    this.selectedYear = result.selectedYear;
    this.selectedMonthName = this.monthNames[result.selectedMonth - 1];
    // for (let i = 0; i <= 11; i++) {
    //   this.months.push({
    //     month: this.monthNames[this.today.getMonth()],
    //     year: this.today.getFullYear(),
    //     mno: this.today.getMonth() + 1,
    //     data: this.today.getMonth() + ',' + this.today.getFullYear()
    //   });
    // }
    // this.months = this.months.reverse();
    this.getPayslipData(this.selectedYear, this.selectedMonth + 1);
    this.viewPayslip(this.selectedYear, this.selectedMonth + 1);
  }
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartLabels: string[] = [
    'Total Gross Earnings',
    'Net Pay',
    'Total Deductions'
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public colors: any = [{ backgroundColor: ['#60A058', '#5B8EDE', '#ED544E'] }];
  public doughnutChartOptions1(): ChartOptions {
    return {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      plugins: {
        labels: {
          render: 'percentage',
          precision: 2
        }
      },
      cutoutPercentage: 50
    };
  }
  pieChartPlugins = [pluginLabels];
  getPayslipData(year, month) {
    let monthNo = month && month < 10 && month > 0 ? '0' + month : month;
    let payslipDataSubscription = this.payslipService
      .getpayslipData(year, monthNo)
      .subscribe(
        data => {
          if (data != '') {
            this.month = month;
            this.payslipResult[month] = data;
            if (this.payslipResult[month].grossEarning != null) {
              this.doughnutChartData = [
                [
                  this.payslipResult[month].grossEarning,
                  this.payslipResult[month].netPay,
                  this.payslipResult[month].deduction
                ]
              ];
            } else {
              this.payslipResult[month] = null;
            }
          }
        },
        err => {
          console.log(err);
        }
      );
    this.payslipSubscription.push(payslipDataSubscription);
  }

  chosenYearHandler(event) {
    let dateSelected = getYear(new Date(event));
    this.selectedYear = dateSelected;
    this.datepicker.close();
    this.getPayslipData(this.selectedYear, this.selectedMonth + 1);
    this.viewPayslip(this.selectedYear, this.selectedMonth + 1);
  }
  navigateToPrevMonth() {
    this.doughnutChartData = [];
    this.selectedMonth -= 1;
    if (this.selectedMonth < 0) {
      this.selectedMonth += 12;
      this.selectedYear -= 1;
    }
    this.viewPayslip(this.selectedYear, this.selectedMonth + 1);
    this.getPayslipData(this.selectedYear, this.selectedMonth + 1);
    this.selectedMonthName = this.monthNames[this.selectedMonth];
  }
  navigateToNextMonth() {
    this.doughnutChartData = [];
    this.selectedMonth += 1;
    if (this.selectedMonth >= 12) {
      this.selectedMonth -= 12;
      this.selectedYear += 1;
    }
    this.getPayslipData(this.selectedYear, this.selectedMonth + 1);
    this.viewPayslip(this.selectedYear, this.selectedMonth + 1);
    this.selectedMonthName = this.monthNames[this.selectedMonth];
  }
  getEmpBankDetails() {
    this.payslipService.getBankDetails().subscribe(
      data => {
        this.bankDetails = data;
      },

      err => {
        console.log(err);
      }
    );
  }
  viewPayslip(year, monthNo) {
    let pdfDataSubscription = this.payslipService
      .getPDFbyYear(year, monthNo)
      .subscribe(
        data => {
          if (data) {
            this.file = new Blob([data], { type: 'application/pdf' });
            this.pdfUrl = URL.createObjectURL(this.file);
          } else {
            this.pdfUrl = null;
          }
        },
        error => {
          this.pdfUrl = null;
        }
      );
    this.payslipSubscription.push(pdfDataSubscription);
  }

  downloadPdf() {
    this.payslipService
      .getPDFbyYear(this.selectedYear, this.selectedMonth + 1)
      .subscribe(data => {
        if (data) {
          this.file = new Blob([data], { type: 'application/pdf' });
          this.pdfUrl = URL.createObjectURL(this.file);
          var fileLink = document.createElement('a');
          fileLink.href = this.pdfUrl;
          let DisplayYear;
          let DisplayMonth;
          for (let i = 0; i < this.payslipResult.length; i++) {
            if (this.pdfUrl != null) {
              DisplayYear = this.selectedYear;
              DisplayMonth = this.selectedMonthName;
            }
          }
          fileLink.download =
            'Payslip' + ' ' + DisplayMonth + ',' + DisplayYear;

          fileLink.click();
        }
      });
  }
  payslipEmailDetail() {
    this.payslipService
      .sendEmail(this.emailId, this.selectedYear, this.selectedMonth + 1)
      .subscribe(
        res => {
          if (res['responseStatus'] == 'SUCCESS') {
            {
              this.messageModalSrv.showMessage(
                'Email sent successfully.',
                'Success',
                'success-icon',
                'CLOSE'
              );
              this.emailId = '';
            }
          } else {
            //shows error msg
            this.messageModalSrv.showMessage(
              'We were unable to send the email. Please try again later.',
              'Error',
              'warning-icon',
              'CLOSE'
            );
          }
        },
        err => {
          this.messageModalSrv.showMessage(
            'We were unable to send the email. Please try again later.',
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      );
  }
  goBack(event) {
    if (event == 'mail') {
      if (this.pdfUrl) {
        this.showModal();
      }
    } else if (event == 'download_pdf') {
      if (this.pdfUrl) {
        this.downloadPdf();
      }
    }
  }
  showModal() {
    const modalRef = this.activeModal.open(EmailModalComponent, {
      width: '450px',
      height: '350px'
    });
    modalRef.componentInstance.emailTitle = 'Send Via Email';
    modalRef.componentInstance.dismissCallback = (
      reason: HrssEmailActions,
      id: any
    ) => {
      if (reason === HrssEmailActions.SEND && id !== null) {
        this.emailId = id;
        this.payslipEmailDetail();
        this.activeModal.closeAll();
      }
      if (reason === HrssEmailActions.CANCEL && id == null) {
        this.activeModal.closeAll();
      }
    };
  }
}
