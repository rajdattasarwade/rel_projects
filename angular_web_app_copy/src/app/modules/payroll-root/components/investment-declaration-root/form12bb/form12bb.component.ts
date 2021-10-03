import { Component, OnInit, OnDestroy } from '@angular/core';
import { InvestmentDeclarationRootService } from '../investment-declaration-root.service';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { MatDialog } from '@angular/material/dialog';
import { IconsModel } from 'src/app/components/common/common-models';
import {
  EmailModalComponent,
  HrssEmailActions,
} from 'src/app/components/shared/email-modal/email-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form12bb',
  templateUrl: './form12bb.component.html',
  styleUrls: ['./form12bb.component.css'],
})
export class Form12bbComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  edit: boolean = false;
  icons: any;
  emailId: any;
  financialYear: string;
  file: any;
  fileToDownloadUrl: any;
  fileNameToSave: string;
  fileAvailable: boolean;
  objCertify = { Action: 'C' };
  constructor(
    public messageModalSrv: MessageModalService,
    public activeModal: MatDialog,
    private service: InvestmentDeclarationRootService
  ) {
    this.subscription = new Subscription();
    this.icons = [];
    this.icons.push(new IconsModel('', '', 'header-ico mail_ico ', 'mail'));
    this.icons.push(
      new IconsModel('', '', 'header-ico download_pdf_ico', 'download_pdf')
    );
    this.icons.push(new IconsModel('print', '', '', 'print'));
    this.icons.push(new IconsModel('', '', 'header-ico info_ico ', 'info'));
    this.financialYear = this.service.getFinancialYear;
  }
  ngOnInit(): void {
    this.getForm12bbPdf();
    this.edit = this.service.formBBEdit;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  goBack() {
    this.service.inNavigateTo(['/payroll/investment-declaration']);
  }
  actionEvent(event) {
    console.log(event);
    if (event == 'mail') {
      if (this.fileToDownloadUrl){
        this.showEmailModal();
    }
    } else if (event == 'download_pdf') {
      if (this.fileToDownloadUrl) {
        this.downloadPdf();
      }
    } else if (event == 'print') {
      if (this.fileToDownloadUrl) {
        this.printPdf();
      }
    } else if (event == 'info_ico') {
    }
  }
  sendEmailPdf() {
    console.log('email service is not available yet for form12bb');
    this.service.sendForm12BBViaEmail(this.emailId).subscribe(
      (res) => {
        if (res) {
          this.showSuccessMessage('Email sent successfully.');
        } else {
          this.showErrorMessage(
            'We were unable to send the email. Please try again later.'
          );
        }
      },
      (err) => {
        this.showErrorMessage(
          'We were unable to send the email. Please try again later.'
        );
      }
    );
  }
  showEmailModal() {
    const modalRef = this.activeModal.open(EmailModalComponent, {
      width: '450px',
      height: '350px',
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
  downloadPdf() {
    console.log('download pdf form 12 bb');
    this.directDownloadFile();
  }
  printPdf() {
    window.open(this.fileToDownloadUrl, 'Form 12 BB' + this.financialYear);
    // window.print();
    // this.printDiv('printDiv');
  }
  directDownloadFile() {
    let D = document;
    let link = D.createElement('a');
    link.href = this.fileToDownloadUrl;
    link.download = this.fileNameToSave;
    link.click();
    let msg = this.fileNameToSave + 'has been downloaded.'; //future use
  }
  getForm12bbPdf() {
    var sub = this.service.getForm12bbPdf().subscribe(
      (data: any) => {
        if (data) {
          console.log('pdf');
          console.log(data);
          this.file = new Blob([data], { type: 'application/pdf' });
          this.fileToDownloadUrl = URL.createObjectURL(this.file);
          console.log(this.file);
          console.log(this.fileToDownloadUrl);
          this.fileNameToSave = 'Form 12 BB' + this.financialYear;
          this.fileAvailable = true;
        } else {
          this.fileToDownloadUrl = null;
          this.fileAvailable = false;
        }
      },
      (error) => {
        console.error('Form12BB Error=>', error);
        this.fileToDownloadUrl = null;
        this.fileAvailable = false;
      }
    );
    this.subscription.add(sub);
  }

  cancel() {
    this.goBack();
  }
  icertify() {
    console.log('icertify');
    this.messageModalSrv.showConfirmation(
      'You are about to certify Form 12 BB with details shown in pdf.',
      'Confirm',
      'confirmation-icon',
      this.MessageResponse.bind(this),
      'I certify',
      'Cancel'
    );
  }
  MessageResponse(d) {
    if (d == 'YES') {
      this.cerfityForm12bb();
    }
  }
  cerfityForm12bb() {
    var sub = this.service.certifyForm12bb(this.objCertify).subscribe(
      (res) => {
        if (res) {
          this.showSuccessMessage(
            'Form 12 BB has been certifies successfully.'
          );
        } else {
          this.showErrorMessage(
            'Not able to certify Form 12 BB. Please try again later.'
          );
        }
      },
      (error) => {
        this.showErrorMessage(
          'Not able to certify Form 12 BB. Please try again later.'
        );
        console.log('error in Form 12 BB certify=>', error);
      }
    );
    this.subscription.add(sub);
  }
  printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  showSuccessMessage(message) {
    this.messageModalSrv.showMessage(
      message,
      'Success',
      'success-icon',
      'CLOSE',
      () => {
        this.cancel();
      }
    );
  }

  showErrorMessage(message) {
    this.messageModalSrv.showMessage(
      message,
      'Error',
      'warning-icon',
      'CLOSE',
      () => {
        this.cancel();
      }
    );
  }
}
