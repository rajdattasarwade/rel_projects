import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { PayrollService } from '../../payroll.service';
import { MessageModalService } from '../../../../components/shared/services/message-modal-service';
import { IconsModel } from '../../../../components/common/common-models';
import { MatDialog } from '@angular/material/dialog';
import { EmailModalComponent } from 'src/app/components/shared/email-modal/email-modal.component';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
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
  selector: 'income-tax-prj-service',
  templateUrl: './income-tax-prj-service.component.html',
  styleUrls: ['./income-tax-prj-service.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class IncomeTaxPrjServiceComponent implements OnInit, OnDestroy {
  breadcrumbJson: any = [
    {
      label: 'Payroll',
      link: '/payroll'
    },
    {
      label: 'Income Tax Projection',
      link: '/payroll/income-tax-projection'
    }
  ];
  currentDate: moment.Moment;
  date = new FormControl(moment());
  taxProjectionPdf: any;
  taxProjectionBlob: any;
  taxSummaryData: any = [];
  remainingMonths: any;
  balMonth: any;
  subscription: Subscription[] = [];
  icons: any;
  emailId: any;
  constructor(
    private payrollservice: PayrollService,
    private messageModalService: MessageModalService,
    public modalService: MatDialog
  ) {
    this.icons = [];
    this.icons.push(
      new IconsModel('', '', 'header-ico white_view_ico', 'view')
    );
    this.icons.push(
      new IconsModel('', '', 'header-ico download_pdf_ico', 'download')
    );
    this.icons.push(new IconsModel('', '', 'header-ico mail_ico', 'mail'));
  }

  ngOnInit(): void {
    this.currentDate = moment().subtract(1, 'months');
    this.date.setValue(this.currentDate);
    this.getITPDetails();
    this.getProjection(this.currentDate.month() + 1, this.currentDate.year());
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.taxProjectionPdf = null;
    this.currentDate = moment(normalizedMonth);
    this.getProjection(this.currentDate.month() + 1, this.currentDate.year());
  }
  getProjection(month, year) {
    this.taxProjectionPdf = null;
    this.subscription.push(
      this.payrollservice.getTaxProjectionPDF(month, year).subscribe(
        (data) => {
          this.taxProjectionBlob = data;
          this.taxProjectionPdf = URL.createObjectURL(data);
          if (!this.taxProjectionPdf) {
            this.pdfUnavailability();
          }
        },
        (error) => {
          this.pdfUnavailability();
        }
      )
    );
  }
  pdfUnavailability() {
    this.messageModalService.showMessage(
      'Data not processed for the selected period',
      'Error',
      'warning-icon',
      'CLOSE'
    );
  }
  getITPDetails() {
    this.subscription.push(
      this.payrollservice.getTaxSummaryDetails().subscribe((data: any) => {
        if (data) {
          this.taxSummaryData = data;
          for (let item in this.taxSummaryData) {
            this.taxSummaryData[item] = this.taxSummaryData[item].replace(
              /[^.\d]/g,
              ''
            );
          }
          this.remainingMonths = this.monthDiff(new Date()) + 1;
          if (this.taxSummaryData.balRecovery == '0.00') {
            this.balMonth = '0.00';
          } else {
            this.balMonth =
              this.taxSummaryData.balRecovery / this.remainingMonths;
          }
        }
      })
    );
  }

  monthDiff(dateFrom) {
    let datefromYear = dateFrom.getFullYear();
    let dateToyear;
    if (dateFrom.getMonth() < 3) {
      dateToyear = datefromYear;
    } else {
      dateToyear = datefromYear + 1;
    }
    return 2 - dateFrom.getMonth() + 12 * (dateToyear - datefromYear);
  }
  indianRupeeFormat(val) {
    return (
      '₹' +
      Number(val).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  public prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.date.setValue(this.currentDate);
    this.getProjection(this.currentDate.month() + 1, this.currentDate.year());
  }

  public nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.date.setValue(this.currentDate);
    this.getProjection(this.currentDate.month() + 1, this.currentDate.year());
  }
  onIconClick(event) {
    let month = this.currentDate.month() + 1;
    if (event == 'download') {
      if (this.taxProjectionPdf) {
        var anchor = document.createElement('a');
        (anchor.download =
          'Income Tax Projection ' + this.currentDate.year() + '/' + month),
          (anchor.href = this.taxProjectionPdf);
        anchor.click();
      }
    }
    if (event == 'mail') {
      if (this.taxProjectionPdf) {
        this.openEmailPopup();
      }
    }
    if (event == 'view') {
      if (this.taxProjectionPdf) {
        const dialogRef = this.modalService.open(PdfViewerModalComponent);
        dialogRef.componentInstance.pdfUrl = this.taxProjectionPdf;
        dialogRef.componentInstance.title = 'Income Tax Projection';
      }
    }
  }
  openEmailPopup() {
    const modalRef = this.modalService.open(EmailModalComponent, {
      width: '450px',
      height: '350px',
    });
    modalRef.componentInstance.emailTitle = 'Share Via Email';
    modalRef.componentInstance.dismissCallback = (reason: any, id: any) => {
      if (reason == 'SEND') {
        this.emailId = id;
        this.sendEmail();
        this.modalService.closeAll();
      }
      if (reason == 'CANCEL') {
        this.modalService.closeAll();
      }
    };
  }
  sendEmail() {
    this.payrollservice
      .sendTaxProjectionMail(
        this.emailId,
        this.currentDate.month() + 1,
        this.currentDate.year()
      )
      .subscribe(
        (res) => {
          this.emailId = '';
          if (res['responseStatus'] == 'SUCCESS') {
            {
              this.messageModalService.showMessage(
                'Email sent successfully.',
                'Success',
                'success-icon',
                'CLOSE'
              );
            }
          } else {
            this.emailErrorMsg();
          }
        },
        (err) => {
          this.emailErrorMsg();
        }
      );
  }
  emailErrorMsg() {
    this.messageModalService.showMessage(
      'We were unable to send the email. Please try again later.',
      'Error',
      'warning-icon',
      'CLOSE'
    );
  }

  ngOnDestroy() {
    if (this.subscription.length > 0) {
      this.subscription.forEach((s) => s.unsubscribe());
    }
  }
}
