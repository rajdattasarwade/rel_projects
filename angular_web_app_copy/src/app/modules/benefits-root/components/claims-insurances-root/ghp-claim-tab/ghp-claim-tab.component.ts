import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GhpClaimModalComponent } from './ghp-claim-modal/ghp-claim-modal.component';
import { GhpClaimService } from './ghp-claim.service';
import * as moment from 'moment';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-ghp-claim-tab',
  templateUrl: './ghp-claim-tab.component.html',
  styleUrls: ['./ghp-claim-tab.component.css']
})
export class GhpClaimTabComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['claimDate','name','claimAmount','passedAmount','claimStatus','action','claimNo'];
  dataSource = [];


  constructor(public dialogRef: MatDialogRef<GhpClaimTabComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any, 
              public activeModal: MatDialog,
              private ghpClaimService: GhpClaimService) { }

  ngOnInit(): void {
    this.getGhpHistory()
  }

  ngOnDestroy(){
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }


  openCreateClaim(flag,element) {
    let rowData = Object.assign({},element)
    const dialogRef = this.activeModal.open(GhpClaimModalComponent, {
      width: '800px', 
      autoFocus: false,
      data: {
        flag: flag,
        element: rowData
      }
    });

    this.subscriptionsList.push(dialogRef.afterClosed().subscribe(
      ()=>{
        this.getGhpHistory()
      }
    ))
  }

  getGhpHistory(){
    this.subscriptionsList.push(
      this.ghpClaimService.getGhpHistory().subscribe(
        (data: any)=>{
          if(data.length>0){
          this.dataSource = data
          this.dataSource.forEach(element=>{
            element.claimDate =  element.claimDate?moment(element.claimDate).format('DD-MM-YYYY'):null
          })
          }
        }
      )
    )
  }

  printGhpClaim(element){
    this.subscriptionsList.push(
      this.ghpClaimService.printGhp(element.claimNumber).subscribe(
        (data: any)=>{
          if (data) {
            let file = new Blob([data], { type: 'application/pdf' });
            let pdfUrl = URL.createObjectURL(file);
            const dialogRef = this.activeModal.open(PdfViewerModalComponent);
            dialogRef.componentInstance.pdfUrl = pdfUrl;
            dialogRef.componentInstance.title = 'GHP Claim';
            dialogRef.componentInstance.pdfName = "GHP Claim";
          }

        }
      )
    )
  }

}
