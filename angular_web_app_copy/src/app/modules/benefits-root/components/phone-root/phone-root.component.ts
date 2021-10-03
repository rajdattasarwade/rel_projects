import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from '../../services/benefits.service';

@Component({
  selector: 'app-phone-root',
  templateUrl: './phone-root.component.html',
  styleUrls: ['./phone-root.component.css']
})
export class PhoneRootComponent implements OnInit, OnDestroy {
  policyData: any[] = [];
  videoSourceHere = '';
  subscriptionList: Subscription[] = [];
  checkEglig: any;
  dialogPop:MatDialogRef<any>;
 constructor(public dialog: MatDialog, private router: Router, public dialogRef: MatDialogRef<any>, private benefitService: BenefitsService, private messageModalService: MessageModalService) { }

  ngOnInit(): void {
    this.getPolicySnippets();
  }

  openHandset(handsetEligibilty) {
    this.subscriptionList.push(
      this.benefitService.checkHandsetEligibilty().subscribe((data: any) => {
        if(data){
          this.checkEglig = data;
          this.dialogPop = this.dialog.open(handsetEligibilty, 
            {width: '400px',});
        }
      },
      error => {
        this.messageModalService.showMessage(
          'Error in loading attchment, Please try again',
          'Error',
          'warning-icon',
          'CLOSE'
        );
      })
    );
  }

  handsetReimbursement(){
    this.dialogRef.close();
    this.router.navigate(['/reimbursements']);
  }

  // purcheseDevide(){
  //   this.dialogRef.close();
  //   this.router.navigate(['/benefits/company-leased-vehicle']);
  // }

  applyCompanySim(){
    this.dialogRef.close();
    this.router.navigate(['/benefits/avail-mobile-sim'], );
  }

  applyISDServices(){
    this.dialogRef.close();
    this.router.navigate(['/benefits/isd-calling']);
  }

  applyInternationalServices(){
    this.dialogRef.close();
    this.router.navigate(['/benefits/international-roaming-services']);
  }

  getPolicySnippets(): void {
    this.subscriptionList.push(
      this.benefitService.getViewPolicies('PHON').subscribe((data: any) => {
        this.policyData = data;
        let obj = this.policyData.find(item => item.key == '1');
        this.loadVideo(obj);
      })
    );
  }
  openDocument(item): void {
    this.subscriptionList.push(
      this.benefitService.viewPolicyAttachment(item.policyDoc).subscribe((data: any) => {
        if(data){
          let file = new Blob([data],{type: 'application/pdf'});
          let pdfUrl = URL.createObjectURL(file);
          const dialogRef = this.dialog.open(PdfViewerModalComponent);
          dialogRef.componentInstance.pdfUrl = pdfUrl;
          dialogRef.componentInstance.title = item.text;
          dialogRef.componentInstance.pdfName = item.text;
        }else{
          this.openErrorPopup();
        }
  
      }, error =>{
        this.openErrorPopup();
      })
    );
  }
  openErrorPopup(): void {
    this.messageModalService.showMessage(
      'Sorry for the inconvenience.Please try again.',
      'Error',
      'warning-icon',
      'CLOSE'
    );
  }
  loadVideo(obj): void {
    this.subscriptionList.push(
      this.benefitService.generateVideo(obj.videoUrl).subscribe((data: any) => {
        const blob = new Blob([data], { type: "video/mp4" });
        this.videoSourceHere = URL.createObjectURL(blob);
      })
    );
  }
  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0){
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      })
    }
  }
}
