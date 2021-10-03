import { Component, OnInit, OnDestroy } from '@angular/core';
import { PayrollService } from '../../payroll.service';
import { Subscription } from 'rxjs';
import { TotalPayStatmentService } from './total-pay-statment.service';
import { IconsModel } from '../../../../components/common/common-models';
import { MatDialog } from '@angular/material/dialog';
import { EmailModalComponent, HrssEmailActions } from 'src/app/components/shared/email-modal/email-modal.component';
import { SuccessModalComponent } from 'src/app/modules/leave-and-attendance-root/components/success-modal/success-modal.component';
import { ErrorModalComponent } from '../choicepay-root/error-modal/error-modal.component';


@Component({
  selector: 'total-pay-statement-service',
  templateUrl: './total-pay-statement-service.component.html',
  styleUrls: ['./total-pay-statement-service.component.css'],
  providers:[TotalPayStatmentService]
})
export class TotalPayStatementServiceComponent implements OnInit, OnDestroy {
  breadcrumbJson: any = [
    {
      label: 'Payroll',
      link: '/payroll'
    },
    {
      label: 'Pay Statement',
      link: '/payroll/total-pay-statement'
    }
  ];
  file: any;
  pdfUrl: any;
  subscriptionList: Subscription[] = [];
  icons: any;
  payStatment= {
    ctc: '',
    debit:'',
    basePay:'',
    choicePay:'',
    fixedPay:''
  };

  constructor(private payrollService: PayrollService, private totalPayStatmentService: TotalPayStatmentService, public activeModal: MatDialog) {
    this.icons = [];
    this.icons.push(new IconsModel('','','header-ico mail_ico','mail'));
    this.icons.push(new IconsModel('','','header-ico download_pdf_ico','download_pdf'));
    this.icons.push(new IconsModel('','','header-ico save_pdf_ico','save'));
  }

  ngOnInit(): void {
    this.getStatmentPdf();
    this.getPayDataOnPeriod();
  }

  getStatmentPdf(): void {
    this.subscriptionList.push(
      this.totalPayStatmentService.getTotalPayStatmentPDF().subscribe( (data: any) => {
        if(data) {
          this.file = new Blob([data],{type: 'application/pdf'});
          this.pdfUrl = URL.createObjectURL(this.file);
        }
      }, (error: any) => {
        console.log(error.message);
      })
    );
  }

  getPayDataOnPeriod(): void{ 
    const data = this.payrollService.getChoicePayData();
    console.log(data);
    
    if(data) {
    const payDetail = data.payDetail;
    const payData = data.payData;
    let cPay = payDetail.find(item => item.component === 'TCHP');
    let c1Pay = payDetail.find(item => item.component === 'TSPA');
    if(cPay && c1Pay) {
      this.payStatment['choicePay'] = cPay.amount + c1Pay.amount;
    }else{
      this.payStatment['choicePay'] = cPay ? cPay.amount: c1Pay.amount;
    }
    let bPay = payDetail.find(item => item.component === 'BPAY');
    
    let fPay = payDetail.find(item => item.component === 'TCTC');
    let ctcs = payData.find(item => item.compensationType === 'CTC');
    let debits = payData.find(item => item.compensationType === 'TOTAL_DEBIT');
    this.payStatment['basePay'] = bPay ? bPay.amount:0.0;
    this.payStatment['fixedPay'] = fPay? fPay.amount:0.0;      
    this.payStatment['ctc'] = ctcs ? ctcs.amount: 0.0;
    this.payStatment['debit'] = debits? debits.amount: 0.0;
  }
  }

  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0) {
      this.subscriptionList.forEach(subscription => {
        subscription.unsubscribe();
      });
    }
  }
  goBack(event) {
    if (event == 'mail') {
      if (this.pdfUrl) {
        this.showModal();
      }
    } else if(event == 'download_pdf') {
      if(this.pdfUrl) {
        var fileLink = document.createElement('a');
        fileLink.href = this.pdfUrl;
        fileLink.download = 'CTC Statement';
        fileLink.click();
      }
    } else if (event == 'save') {
      if (this.pdfUrl) {
        console.log('save button');
      }
    }
  }
  showModal() {
    const modalRef = this.activeModal.open(EmailModalComponent, {});
     modalRef.componentInstance.emailTitle = "Send Via Email";
     modalRef.componentInstance.dismissCallback = (
     reason: HrssEmailActions,
     emailIdValue
     ) => {
     if (reason === HrssEmailActions.SEND && emailIdValue !== null) {
       this.sendEmail(emailIdValue, 'CTC');
     this.activeModal.closeAll();
     }
     if (reason === HrssEmailActions.CANCEL && emailIdValue == null) {
     this.activeModal.closeAll();
     }
    };
  }
  sendEmail(emailId,docType) {
    this.totalPayStatmentService.sendEmailDetail(emailId, docType).subscribe(
      data => {
        if (data) {
          const dialogRef = this.activeModal.open(SuccessModalComponent, {
            width: '250px',
            height: '150px',
          });
          dialogRef.componentInstance.message =
            data['responseStatus'] == 'SUCCESS'
              ? 'Email sent successfully.'
              : data['responseStatus'] == 'FAILED'
              ? data['systemErrMsg']
              : 'Request failed';
        }
      },
      err => {
        this.activeModal.open(ErrorModalComponent, {
          width: '250px',
          height: '150px',
        });
      }
    );
  }

}
