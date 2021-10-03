import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePfTransferFormComponent } from './create-pf-transfer-form/create-pf-transfer-form.component';
import { PfPensionInfoPopupComponent } from '../pf-pension-info-popup/pf-pension-info-popup.component';
import { Subscription } from 'rxjs';
import { PfPensionService } from '../pf-pension.service';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-pf-transfer-pension',
  templateUrl: './pf-transfer-pension.component.html',
  styleUrls: ['./pf-transfer-pension.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PfTransferPensionComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['pf','prev_employer','type','current_no','prev_no','inward_no','action'];
  dataSource = [];

  constructor(
    public dialog: MatDialog,
    private pfPensionService: PfPensionService,
    private messageService:MessageModalService
  ) { }

  ngOnInit(): void {
    this.getPfPension()
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  openPfTransferForm(flag,data) {
    const dialogRef = this.dialog.open(CreatePfTransferFormComponent, {
      width: '800px',
      data: {
        flag: flag,
        rowData: data
      }
    });

    this.subscriptionsList.push(dialogRef.afterClosed().subscribe(
      (res)=>{
        this.getPfPension()
      }
    ))

  }

  infoPopup() {
    this.dialog.open(PfPensionInfoPopupComponent, {
      width: '450px',
      data: {
        type: 'provident fund'
      }
    });
  }

  getPfPension(){
    this.subscriptionsList.push(this.pfPensionService.getPfPension().subscribe(
      (data: any)=>{
        console.log(data)
        this.dataSource=data
      }
    ))
  }

  confirmDeletePf(element){
    this.messageService.showConfirmation(
      'Are you sure you want to delete the record?',
      'Confirmation',
      'confirmation-icon',
      (reason) => {
        if (reason === 'YES') {
          this.deletePf(element);
        }
      }
    );
  }

  deletePf(element){
    let obj = Object.assign({},element)
    let payload = {
      "deletePfCompanyCode": obj.companyCode,
      "deletePfpensionFlagIndicator": obj.pfpensionFlagIndicator,
      "deleteTransferType": obj.transferType,
      "deleteBarCodeNumber": obj.barCodeNumber
    }
    this.subscriptionsList.push(this.pfPensionService.deletePfPension(payload).subscribe(
      (data: any)=>{
        if (data.responseStatus == 'SUCCESS'){
          this.messageService.showMessage(
            "Deleted Successfully",
            'Success',
            'success-icon',
            'CLOSE'
          );
          this.getPfPension()
        }else {
          let errorMsg =data.systemErrMsg?data.systemErrMsg:''
          this.messageService.showMessage(
            errorMsg,
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
    
      }
    ))
  }

  viewPDF(element){
    this.subscriptionsList.push(
      this.pfPensionService.getPfPDF(
        element.companyCode,
        element.pfpensionFlagIndicator,
        element.transferType,
        element.barCodeNumber
        )
      .subscribe(
      (data: any)=>{
        if(data){
          let file = new Blob([data],{type: 'application/pdf'});
          let pdfUrl = URL.createObjectURL(file);
          const dialogRef = this.dialog.open(PdfViewerModalComponent);
          dialogRef.componentInstance.pdfUrl = pdfUrl;
          dialogRef.componentInstance.title = '';
          dialogRef.componentInstance.pdfName = "Superannuation Transfer";
         }
      }))
  }

}
