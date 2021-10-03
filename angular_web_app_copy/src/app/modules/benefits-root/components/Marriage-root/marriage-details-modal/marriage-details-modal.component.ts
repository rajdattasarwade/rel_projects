import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/components/shared/confirmation-modal/confirmation-modal.component';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { PolicyService } from 'src/app/components/shared/view-policies/view-policies-service/policy.service';
import { BenefitsLandingComponent } from '../../../benefits-landing/benefits-landing.component';
import { BenefitsService } from '../../../services/benefits.service';
import { MarriageLoanModalComponent } from '../../loan-and-advances-root/marriage-loan-modal/marriage-loan-modal.component';

@Component({
  selector: 'app-marriage-details-modal',
  templateUrl: './marriage-details-modal.component.html',
  styleUrls: ['./marriage-details-modal.component.css']
})
export class MarriageDetailsModalComponent implements OnInit,OnDestroy {
  
  videoSourceURl: string = "";
  fileExtension: boolean = false;
  policyDocs: any=[];
  pdfURL: any;
  public subscriptionsList: Subscription[] = [];
  selectedValue: any=4;
  constructor(private router: Router,
    public dialogRef: MatDialogRef<BenefitsLandingComponent>,
    public dialog: MatDialog,
    private policyService: PolicyService,
    private marriageService: BenefitsService,
    private messageService: MessageModalService) { }

  ngOnInit(): void {
    this.getPolicySet()
  }
  getPolicySet() {
    this.subscriptionsList.push(this.marriageService.getPolicyset('MARG').subscribe((response: any) => {
      this.playVideo(response[0])
      response.forEach((element) => {
        if (element.videoUrl == "") {
          this.policyDocs.push(element)
        }
      })
    }))
  }
  playVideo(data) {
    this.videoSourceURl = ""
    this.subscriptionsList.push(this.marriageService.generateVideo(data.videoUrl).subscribe((response: any) => {
      this.videoSourceURl = URL.createObjectURL(response)
    }))
  }
  openPdf(data) {
    this.pdfURL=null
    this.subscriptionsList.push(this.policyService.generatePDFService(data.policyDoc).subscribe((response: any) => {
      this.pdfURL = URL.createObjectURL(response)
      const dialogRef = this.dialog.open(PdfViewerModalComponent);
      dialogRef.componentInstance.pdfUrl = this.pdfURL;
      dialogRef.componentInstance.title = data.text;
    }))
  }
  applyLeave() {
    this.dialogRef.close()
    this.router.navigate(['/leave-and-attendance/leave-planner']);
  }
  applyLoan() {
    this.dialogRef.close()
    this.router.navigate(['/benefits/loan-and-advances'])
  }
  checkStatus() {
    this.subscriptionsList.push(this.marriageService.getLoanStatus().subscribe((response: any) => {
      if (response.length!=0) {
        this.applyLoan()
      }
      else {
        this.applyLoanPopup()
      }
    }))
 
  }
  applyLoanPopup() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.messageIcon="success-icon"
    dialogRef.componentInstance.title="Marriage Loan Status"
    dialogRef.componentInstance.message="You have not applied for a marriage loan yet."
    dialogRef.componentInstance.yesBtn = 'Apply for Loan';
    dialogRef.componentInstance.noBtn = 'Cancel';
    dialogRef.componentInstance.dismiss = (reason: any) => {
      dialogRef.close()
      if (reason == "YES") {
       this.marriageLoanForm() 
      }
    };
  }
  marriageLoanForm() {
    this.subscriptionsList.push(this.marriageService.checkValidityCreateMarriage().subscribe(
      (data:any) => {
        if (
          data.messageBean &&
          data.messageBean.error
        ) {
          this.messageService.showMessage(
            data.messageBean.error.message.value,
            'Error',
            'warning-icon',
            'CLOSE'
          );
          
        } else if (data.response) {

          this.dialog.open(MarriageLoanModalComponent, {
            width: '800px',
          });
        }
      },
      error => {
        console.log(error);
      }
    ));

  }
  addDependent() {
    this.dialogRef.close()
    this.router.navigate(['/benefits/view-edit-dependent-list']);
  }
  ngOnDestroy(){
    if(this.subscriptionsList.length > 0) this.subscriptionsList.forEach(subscription => { subscription.unsubscribe() })
  }

  goToMedibuddy(){
    this.dialogRef.close()
    this.router.navigate(['benefits/claims-insurances'], 
    { queryParams: 
        { tab: this.selectedValue } 
    });
  }

}
