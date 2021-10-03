import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PolicyService } from '../policy.service';
import { PdfViewerModalComponent } from '../../../pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from '../../../services/message-modal-service';
import {
  EmailModalComponent,
  HrssEmailActions,
} from '../../../../../components/shared/email-modal/email-modal.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-view-policies-list',
  templateUrl: './view-policies-list.component.html',
  styleUrls: ['./view-policies-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewPoliciesListComponent implements OnInit {
  public policyData: any;
  subscripton: Subscription[] = [];
  emailId: string;
  pdfName: any;
  PdfId: any;
  private activePolicy: any;
  activePolicyData: any = [];
  constructor(
    public activeModal: MatDialog,
    private policyService: PolicyService,
    private messageModalService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.activePolicy = this.policyService.activePolicy;
    this.policyService.policyData.forEach((element) => {
      element.text == this.activePolicy
        ? this.activePolicyData.push(element)
        : '';
    });
  }
  generatePDF(documentNo: string, documentName: string) {
    this.subscripton.push(
      this.policyService.generatePDFService(documentNo).subscribe(
        (data) => {
          this.pdfName = documentName.replace(' ', '');
          this.PdfId = documentNo;
          let file = new Blob([data], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(file);
          // jsCallbacks.openUrlInBrowser(pdfUrl);
          const dialogRef = this.activeModal.open(PdfViewerModalComponent);
          dialogRef.componentInstance.pdfUrl = pdfUrl;
          dialogRef.componentInstance.title = documentName;
          dialogRef.componentInstance.pdfName = documentName;
          dialogRef.componentInstance.sendEmail = 'true';
          dialogRef.componentInstance.dismissCallback = (
            reason: string
          ): any => {
            if (reason == 'EMAIL') {
              this.showEmailModal();
            }
          };
        },
        (error) => {
          console.log('error', error);
        }
      )
    );
  }
  showEmailModal() {
    const modalRefEmail = this.activeModal.open(EmailModalComponent, {
      width: '450px',
      height: '350px',
    });
    modalRefEmail.componentInstance.emailTitle = 'Send Via Email';
    modalRefEmail.componentInstance.rilSpecific = true;
    modalRefEmail.componentInstance.dismissCallback = (
      reason: HrssEmailActions,
      id: any
    ) => {
      if (reason === HrssEmailActions.SEND && id !== null) {
        this.emailId = id;
        this.sendEmail();
        this.activeModal.closeAll();
      }
      if (reason === HrssEmailActions.CANCEL) {
        modalRefEmail.close();
      }
    };
  }
  sendEmail() {
    this.subscripton.push(
      this.policyService
        .sendEmail(this.emailId, this.pdfName, this.PdfId)
        .subscribe(
          (res) => {
            if (res['responseStatus'] == 'SUCCESS') {
              {
                this.messageModalService.showMessage(
                  'Email sent successfully.',
                  'Success',
                  'success-icon',
                  'CLOSE'
                );
                this.emailId = '';
              }
            } else {
              //shows error msg
              this.messageModalService.showMessage(
                'We were unable to send the email. Please try again later.',
                'Error',
                'warning-icon',
                'CLOSE'
              );
            }
          },
          (err) => {
            this.messageModalService.showMessage(
              'We were unable to send the email. Please try again later.',
              'Error',
              'warning-icon',
              'CLOSE'
            );
          }
        )
    );
  }
  ngOnDestroy() {
    if (this.subscripton.length > 0)
      this.subscripton.forEach((s) => s.unsubscribe());
  }
}
