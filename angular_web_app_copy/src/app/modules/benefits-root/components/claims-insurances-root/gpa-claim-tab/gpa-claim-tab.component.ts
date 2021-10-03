import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CoverageClaimsModalComponent } from './coverage-claims-modal/coverage-claims-modal.component';
import { GpaClaimModalComponent } from './gpa-claim-modal/gpa-claim-modal.component';
import { GpaClaimService } from './gpa-claim.service';
import * as moment from 'moment';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-gpa-claim-tab',
  templateUrl: './gpa-claim-tab.component.html',
  styleUrls: ['./gpa-claim-tab.component.css']
})
export class GpaClaimTabComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['intimationDate','claimAmount','passedAmount','claimStatus','action','claimNo'];
  dataSource = [];

  constructor(public dialogRef: MatDialogRef<GpaClaimModalComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any, 
              public activeModal: MatDialog,
              private gpaClaimService: GpaClaimService) { }

  ngOnInit(): void {
    this.getGpaHistory()
  }

  ngOnDestroy(){
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  openClaimIntimation(){
    const dialogRef = this.activeModal.open(GpaClaimModalComponent, {
      width: '683px'
    });
    this.subscriptionsList.push(dialogRef.afterClosed().subscribe(
      ()=>{this.getGpaHistory()}
    ))

  }

  getGpaHistory(){
    this.dataSource=[]
    this.subscriptionsList.push(
      this.gpaClaimService.getHistory().subscribe(
        (response: any)=>{
          if(response.length > 0){
            response.forEach(element=>{
              element.intimationDate = element.intimationDate?moment(element.intimationDate).format('DD-MM-YYYY'):null
            })
            this.dataSource = response
          }
        }
      )
    )
  }

  printGpa(element){
    this.subscriptionsList.push(
      this.gpaClaimService.printGpa(element.claimNumber).subscribe(
        (data: any)=>{
          if(data){
            let file = new Blob([data],{type: 'application/pdf'});
            let pdfUrl = URL.createObjectURL(file);
            const dialogRef = this.activeModal.open(PdfViewerModalComponent);
            dialogRef.componentInstance.pdfUrl = pdfUrl;
            dialogRef.componentInstance.title = 'GPA Claim';
            dialogRef.componentInstance.pdfName = "GPA Claim";
           }
        }
      )
    )
  }
  openEditModal(element, view){
    const dialogRef = this.activeModal.open(CoverageClaimsModalComponent, {
      width: '683px',
      data: {
        claimNo: element.claimNumber,
        view: view
      }
    });

    this.subscriptionsList.push(dialogRef.afterClosed().subscribe(
      ()=>{this.getGpaHistory()}
    ))    

  }


}
