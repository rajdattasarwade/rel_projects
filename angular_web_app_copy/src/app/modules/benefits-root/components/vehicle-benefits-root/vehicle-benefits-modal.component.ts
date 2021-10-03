import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PdfViewerModalComponent } from '../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { BenefitsService } from '../../services/benefits.service';
import { MessageModalService } from '../../../../components/shared/services/message-modal-service';

@Component({
  selector: 'app-vehicle-benefits-modal',
  templateUrl: './vehicle-benefits-modal.component.html',
  styleUrls: ['./vehicle-benefits-modal.component.css']
})
export class VehicleBenefitsModalComponent implements OnInit {
  policyData: any[] = [];
  videoSourceHere = '';
  
  constructor(public dialog: MatDialog,private router: Router, public dialogRef: MatDialogRef<any>,
  private benefitService:BenefitsService,public messageModalService:MessageModalService) { }

  ngOnInit(): void {
    this.getPolicySnippets();
  }

  checkStatus(){
    this.dialogRef.close();
    this.router.navigate(['/reimbursements']);
  }

  updateChoicePay(){
    this.dialogRef.close();
    this.router.navigate(['/payroll']);
  }

  submitQueryMoal(){
    this.openCommingPopup();
  }
  vehicleLogBook(){
    this.openCommingPopup();
  }

  clvModal(){
    this.dialogRef.close();
    this.router.navigate(['/benefits/company-leased-vehicle']);
  }
  applyClaimReimb(){
    this.dialogRef.close();
    this.router.navigate(['/reimbursements']);
  }

  totalPayModal(){
    this.dialogRef.close();
    this.router.navigate(['/payroll/total-pay-statement']);
  }

  getPolicySnippets(): void {
    this.benefitService.getViewPolicies('VEHI').subscribe((data: any) => {
      this.policyData = data;
      let obj = this.policyData.find(item => item.key == '1');
      this.benefitService.generateVideo(obj.videoUrl).subscribe((data: any) => {
        const blob = new Blob([data], { type: "video/mp4" });
        this.videoSourceHere = URL.createObjectURL(blob);
      })
    });
  }
  openDocument(item): void {
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
  }
  openErrorPopup(): void {
    this.messageModalService.showMessage(
      'Error in loading attchment, Please try again',
      'Error',
      'warning-icon',
      'CLOSE'
    );
  }
  openCommingPopup(): void {
    this.messageModalService.showMessage(
      'Comming Soon',
      'Message',
      'info-icon',
      'CLOSE'
    );
  }
}
