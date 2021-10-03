import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../../payroll.service';
import { Subscription } from 'rxjs';
import { MessageModalService } from '../../../../components/shared/services/message-modal-service';
import { IconsModel } from '../../../../components/common/common-models';
import { MatDialog } from '@angular/material/dialog';
import {
  EmailModalComponent,
  HrssEmailActions
} from '../../../../components/shared/email-modal/email-modal.component';

@Component({
  selector: 'digital-form-service',
  templateUrl: './digital-form-service.component.html',
  styleUrls: ['./digital-form-service.component.css']
})
export class DigitalFormServiceComponent implements OnInit {
  breadcrumbJson: any = [
    {
      label: 'Payroll',
      link: '/payroll'
    },
    {
      label: 'Digital Form 16',
      link: '/payroll/digital-form-16'
    }
  ];
  yearList = [];
  selectedFinacialYear: any;
  pdfUrl: any;
  file: any;
  FinalYear: any;
  show: boolean = false;
  payslipSubscription: Subscription[] = [];
  fileName: string;
  fileAvailable: boolean;
  emailId: any;
  icons: any;
  formList = [];
  FormDate: any;
  constructor(
    private payslipService: PayrollService,
    public messageModalSrv: MessageModalService,
    public activeModal: MatDialog
  ) {
    this.icons = [];
    this.icons.push(
      new IconsModel('', '', 'header-ico download_pdf_ico', 'download_pdf')
    );
    this.icons.push(new IconsModel('', '', 'header-ico mail_ico ', 'mail'));
    this.icons.push(new IconsModel('', '', 'header-ico info_ico ', 'info'));
  }

  ngOnInit(): void {
    this.getYear();
  }

  getYear() {
    this.payslipService.getYearList().subscribe(data => {
      let a = data;
      for (let i = 0; i < a.length; i++) {
        if (a[i].financialYear != null && a[i].financialYearDisplay != null) {
          this.yearList.push(a[i]);
        }
      }
      this.FinalYear = this.yearList[0].financialYear;
      // this.viewForm16();
      this.getFormsList();
    });
    err => {
      console.log(err);
    };
  }
  viewForm16() {
    for (let i = 0; i < this.formList.length; i++) {
      if (this.FormDate == this.formList[i].form16Date) {
        this.payslipService
          .getForm(
            this.formList[i].form16Date,
            this.formList[i].financialYear,
            this.formList[i].permanentNo,
            this.formList[i].dataId
          )
          .subscribe(
            data => {
              if (data) {
                this.file = new Blob([data], { type: 'application/pdf' });
                this.pdfUrl = URL.createObjectURL(this.file);
                this.fileName = 'Form16' + this.FinalYear;
                this.fileAvailable = true;
              } else {
                this.pdfUrl = null;
                this.fileAvailable = false;
              }
            },
            error => {
              this.pdfUrl = null;
              this.fileAvailable = false;
            }
          );
      }
    }
  }
  showInstructions() {
    // this.show = true;
    this.show = !this.show;
  }
  downloadPdf() {
    // window.open(this.pdfUrl, 'Form 16' + this.FinalYear);
    for (let i = 0; i < this.formList.length; i++) {
      if (this.FormDate == this.formList[i].form16Date) {
        this.payslipService
          .getForm(
            this.formList[i].form16Date,
            this.formList[i].financialYear,
            this.formList[i].permanentNo,
            this.formList[i].dataId
          )
          .subscribe(data => {
            if (data) {
              this.file = new Blob([data], { type: 'application/pdf' });
              this.pdfUrl = URL.createObjectURL(this.file);
              var fileLink = document.createElement('a');
              fileLink.href = this.pdfUrl;
              let DisplayYear;
              for (let i = 0; i < this.yearList.length; i++) {
                if (this.yearList[i].financialYear == this.FinalYear) {
                  DisplayYear = this.yearList[i].financialYearDisplay;
                }
              }
              fileLink.download = 'Form16' + ' ' + 'FY' + ' ' + DisplayYear;

              fileLink.click();
            }
          });
      }
    }
  }
  sendEmailPdf() {
    this.payslipService
      .sendEmailWithPDF(this.FinalYear, this.emailId)
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
    console.log(event);
    if (event == 'mail') {
      if (this.pdfUrl) {
        this.showModal();
      }
    } else if (event == 'download_pdf') {
      if (this.pdfUrl) {
        this.downloadPdf();
      }
    } else if (event == 'info_ico') {
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
        this.sendEmailPdf();
        this.activeModal.closeAll();
      }
      if (reason === HrssEmailActions.CANCEL && id == null) {
        this.activeModal.closeAll();
      }
    };
  }
  getFormsList() {
    this.payslipService.getDetailsLlist(this.FinalYear).subscribe(data => {
      let a = data;
      this.formList = [];
      for (let i = 0; i < a.length; i++) {
        if (a[i].form16Date != null && a[i].dropdownText != null) {
          this.formList.push(a[i]);
        }
      }
      this.FormDate = this.formList[0].form16Date;
      this.viewForm16();
    });
    err => {
      console.log(err);
    };
  }
}
