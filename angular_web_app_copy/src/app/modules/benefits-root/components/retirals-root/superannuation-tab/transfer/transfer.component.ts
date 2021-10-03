import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SuperannuationService } from '../superannuation.service';
import { TransferSuperannuationModalComponent } from '../transfer-superannuation-modal/transfer-superannuation-modal.component';
import * as moment from 'moment';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  public subscriptionList: Subscription[]=[]
  displayedColumns: any = ['previousemployer','dateofleaving','amountrecevied', 'amountreceviedon','inwardno', 'action'];
  dataSource = new MatTableDataSource([])
  // [  {previousemployer:'', dateofleaving: '', amountrecevied: '', amountreceviedon: '',inwardno : ''},];
  constructor(public dialogRef: MatDialogRef<TransferSuperannuationModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public activeModal: MatDialog,
    private supperannuationService: SuperannuationService,
    private messageService: MessageModalService,) { }

  ngOnInit(): void {
    this.getTransferList()
  }
  ngOnDestroy() {
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach(element => {
        element.unsubscribe()
      })
    }
  }
  openTransferModal(flag, rowdata) {
    let element = Object.assign({},rowdata)
  
    const dialogRef = this.activeModal.open(TransferSuperannuationModalComponent, {
      width: '50vw',
      data: {
        flag : flag,
        rowData: element
      }
    });
    this.subscriptionList.push(dialogRef.afterClosed().subscribe((res)=>{
      this.getTransferList()
    }))
  }

  getTransferList(){
    this.dataSource = new MatTableDataSource([])
    this.subscriptionList.push(this.supperannuationService.getTransferList().subscribe(
      (data: any)=>{
        if(data.length > 0){
          data.forEach(element =>{
            element.amountDate =element.amountDate?moment(element.amountDate).format('DD-MM-YYYY'):''
            element.dateOfLeaving = element.dateOfLeaving?moment(element.dateOfLeaving).format('DD-MM-YYYY'):''
          })
          this.dataSource = new MatTableDataSource(data)
        }
      }
    ))
  }

  viewPdf(element){
    let dateOfLeavingDate = element.dateOfLeaving?moment(element.dateOfLeaving,'DD-MM-YYYY').valueOf():''
    this.subscriptionList.push(this.supperannuationService.getTransferPDF(dateOfLeavingDate).subscribe(
      (data: any)=>{
        if(data){
          let file = new Blob([data],{type: 'application/pdf'});
          let pdfUrl = URL.createObjectURL(file);
          const dialogRef = this.activeModal.open(PdfViewerModalComponent);
          dialogRef.componentInstance.pdfUrl = pdfUrl;
          dialogRef.componentInstance.title = 'Superannuation Transfer';
          dialogRef.componentInstance.pdfName = "Superannuation Transfer";
         }
      }
    ))
  }

  deleteRow(element) {
    let dateofleaving = element.dateOfLeaving?moment(element.dateOfLeaving,'DD-MM-YYYY').valueOf():''
    let payload = {
      "prevEmployerName": element.prevEmprName,
      "prevTrustName": element.prevTrustName,
      "address1": element.address1,
      "address2": element.address2,
      "address3": element.address3,
      "address4": element.address4,
      "licCode": element.licCode,
      "dateOfLeaving": dateofleaving,
      "trustId": element.trustId,
      "sequenceNo": element.sequenceNo
    }

    this.subscriptionList.push(
      this.supperannuationService.deleteSuperTransfer(payload).subscribe(
        (data: any) => {
          if (data.responseStatus == 'FAILED') {
            this.messageService.showMessage(
              data.systemErrMsg,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          } else {
            this.messageService.showMessage(
              'Deleted Successfully',
              'Success',
              'success-icon',
              'CLOSE'
            );
            this.getTransferList()
          }
        }
      )
    )
  }

}
