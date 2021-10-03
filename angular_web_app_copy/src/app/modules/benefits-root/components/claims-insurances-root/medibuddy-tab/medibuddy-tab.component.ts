import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HospitalsListPopupComponent } from './hospitals-list-popup/hospitals-list-popup.component';
import { IconsModel } from '../../../../../components/common/common-models';
import { ViewMedibuddyCardComponent } from '../../../components/claims-insurances-root/medibuddy-tab/view-medibuddy-card/view-medibuddy-card.component';
import { from } from 'rxjs';
import { MeddibuddyTabService } from './medibuddy-tab.service';
import { MedibuddyList } from './medibuddy-tab.model';
import { PdfViewerModalComponent } from '../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import {
  EmailModalComponent,
  HrssEmailActions
} from '../../../../../components/shared/email-modal/email-modal.component';
declare var jsCallbacks: any;

@Component({
  selector: 'app-medibuddy-tab',
  templateUrl: './medibuddy-tab.component.html',
  styleUrls: ['./medibuddy-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedibuddyTabComponent implements OnInit {
  cardList: MedibuddyList[];
  employeeName: string;
  policyNumber: string;
  employeeCode: string;
  errMsg: string = '';
  allData: any;

  icons: any;
  ecardemail: any;
  dataObj: any;
  emailId: any;

  constructor(
    public dialog: MatDialog,
    private medibuddyService: MeddibuddyTabService,
    public messageModalSrv: MessageModalService,
    public activeModal: MatDialog
  ) {
    this.icons = [];
    this.icons.push(
      new IconsModel('vertical_align_bottom', 'Download All', '', 'download')
    );
  }

  ngOnInit(): void {
    this.getCardDetails();
  }

  openHospitalsListPopup() {
    this.dialog.open(HospitalsListPopupComponent, {
      width: '800px'
    });
  }
  goBack(event) {
    if (event == 'download') {
      this.downloadAllCards(this.policyNumber);
    } else {
    }
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
  viewMedibuddyCard(i) {
    this.medibuddyService.setviewData = i;
    const dialogRef = this.dialog.open(ViewMedibuddyCardComponent, {
      width: '600px'
    });
  }
  getCardDetails() {
    this.medibuddyService.getCardDetails().subscribe(
      (data: any) => {
        this.medibuddyService.setInsuranceName = data[0].insuranceCompanyName;
        if (data != null && data.length > 0) {
          this.cardList = data;
          // this.hideTab = false;
          this.policyNumber = this.cardList[0].policyNumber;
          this.employeeCode = this.cardList[0].primaryBeneficiaryEmployeeCode;
          this.employeeName = this.cardList[0].primaryBeneficiaryName;
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
  downloadAllCards(policyNumber) {
    this.medibuddyService.getAllCards(policyNumber).subscribe(
      (data: any) => {
        let file = new Blob([data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(file);
        let dialogRef = this.dialog.open(PdfViewerModalComponent);
        dialogRef.componentInstance.pdfUrl = pdfUrl;
        dialogRef.componentInstance.title = 'DHS Cards';
        dialogRef.componentInstance.pdfName = 'DHS Cards';
        dialogRef.componentInstance.dismissCallback = (reason: string): any => {
          if (reason == 'EMAIL') {
            // this.showEmailModal();
          }
        };
      },
      error => {
        console.log('error', error);
      }
    );
  }

  dhsCardEmailDetail(dataObj) {
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
      dataObj.beneficiaryMediAssistId != null
        ? dataObj.beneficiaryMediAssistId
        : '';
    let benefName =
      dataObj.beneficiaryName != null
        ? dataObj.beneficiaryName
        : this.employeeName;
    let ecard_email = this.emailId;
    let policyNum = dataObj.policyNumber != null ? this.policyNumber : '';
    let obj1 = {
      mediAssistId: mediAssId,
      beneficiaryName: benefName,
      mailto: ecard_email,
      policyNumber: policyNum
    };
    // let ecardMailRequest = {
    //   ecardMailRequest: obj1
    // };

    this.medibuddyService.dhsEcardMail(obj1).subscribe(
      data => {
        if (data === true && data != '' && data != null) {
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
  showModal(i) {
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
        this.dhsCardEmailDetail(this.cardList[i]);
        this.activeModal.closeAll();
      }
      if (reason === HrssEmailActions.CANCEL && id == null) {
        this.activeModal.closeAll();
      }
    };
  }
}
