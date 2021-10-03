import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MeddibuddyTabService } from '../medibuddy-tab.service';
import { MedibuddyList, HospitalList } from '../medibuddy-tab.model';
import { PdfViewerModalComponent } from '../../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import {
  EmailModalComponent,
  HrssEmailActions
} from '../../../../../../components/shared/email-modal/email-modal.component';
import { MessageModalService } from '../../../../../../components/shared/services/message-modal-service';

@Component({
  selector: 'app-view-medibuddy-card',
  templateUrl: './view-medibuddy-card.component.html',
  styleUrls: ['./view-medibuddy-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewMedibuddyCardComponent implements OnInit {
  cardList: any;
  employeeName: string;
  policyNumber: string;
  employeeCode: string;
  errMsg: string = '';
  emailId: any;
  dataObj: any;
  constructor(
    public dialogRef: MatDialogRef<ViewMedibuddyCardComponent>,
    private medibuddyService: MeddibuddyTabService,
    public dialog: MatDialog,
    public messageModalSrv: MessageModalService,
    public activeModal: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCardDetails();
  }

  closeModal() {
    this.dialogRef.close();
  }
  getCardDetails() {
    this.medibuddyService.getCardDetails().subscribe(
      (data: any) => {
        let abc;
        abc = this.medibuddyService.getviewData;
        if (data != null && data.length > 0) {
          this.cardList = data[abc];
          if (this.cardList.beneficiaryGender == 'M') {
            this.cardList.beneficiaryGender = 'Male';
          } else if (this.cardList.beneficiaryGender == 'F') {
            this.cardList.beneficiaryGender = 'Female';
          }
          this.policyNumber = data[abc].policyNumber;
          this.employeeCode = data[abc].primaryBeneficiaryEmployeeCode;
          this.employeeName = data[abc].primaryBeneficiaryName;
        } else {
          this.errMsg = 'No Family Details available';
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  downloadDhsCard(dataItem) {
    let assistID = dataItem.beneficiaryMediAssistId;
    let memberNAme = dataItem.beneficiaryName;
    this.medibuddyService.fetchAttachment(assistID, memberNAme).subscribe(
      data => {
        const pdfUrl = window.URL.createObjectURL(data);
        const dialogRef = this.dialog.open(PdfViewerModalComponent);
        dialogRef.componentInstance.pdfUrl = pdfUrl;
        dialogRef.componentInstance.title = 'DHS Cards';
        dialogRef.componentInstance.pdfName = 'DHS Cards';
      },

      err => {
        console.log(err);
      }
    );
  }
  dhsCardEmailDetail() {
    // let obj = {
    //   mediAssistId: dataObj.beneficiaryMediAssistId,
    //   beneficiaryName: dataObj.beneficiaryName,
    //   mailto: this.emailId,
    //   policyNumber: dataObj.policyNumber
    // };
    // let obj1 = {
    //   ecardMailRequest: obj
    // };

    let mediAssId =
      this.cardList.beneficiaryMediAssistId != null
        ? this.cardList.beneficiaryMediAssistId
        : '';
    let benefName =
      this.cardList.beneficiaryName != null
        ? this.cardList.beneficiaryName
        : this.employeeName;
    let ecard_email = this.emailId;
    let policyNum = '';
    let obj1 = [
      {
        mediAssistId: mediAssId,
        beneficiaryName: benefName,
        mailto: ecard_email,
        policyNumber: policyNum
      }
    ];
    let ecardMailRequest = {
      ecardMailRequest: obj1
    };

    this.medibuddyService.dhsEcardMail(ecardMailRequest).subscribe(
      res => {
        if (res['responseStatus'] == 'SUCCESS') {
          this.messageModalSrv.showMessage(
            'Email sent successfully.',
            'Success',
            'success-icon',
            'CLOSE'
          );
        } else {
          //show error msg
          let msg = 'We were unable to send the email. Please try again later.';
          this.messageModalSrv.showMessage(
            msg,
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      },
      err => {
        //show error msg
        let msg = 'We were unable to send the email. Please try again later.';
        this.messageModalSrv.showMessage(msg, 'Error', 'warning-icon', 'CLOSE');
        console.log(err);
      }
    );
  }
  showModal(cardList) {
    const modalRefEmail = this.activeModal.open(EmailModalComponent, {
      width: '450px',
      height: '350px'
    });
    modalRefEmail.componentInstance.emailTitle = 'Send Via Email';
    modalRefEmail.componentInstance.rilSpecific = true;
    modalRefEmail.componentInstance.dismissCallback = (
      reason: HrssEmailActions,
      id: any
    ) => {
      if (reason === HrssEmailActions.SEND && id !== null) {
        this.emailId = id;
        this.dhsCardEmailDetail();
        this.activeModal.closeAll();
      }
      if (reason === HrssEmailActions.CANCEL && id == null) {
        this.activeModal.closeAll();
      }
    };
  }
}
