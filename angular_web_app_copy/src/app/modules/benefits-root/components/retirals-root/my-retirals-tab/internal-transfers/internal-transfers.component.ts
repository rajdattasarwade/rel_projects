import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InternalTransferDetailsPopupComponent } from './internal-transfer-details-popup/internal-transfer-details-popup.component';
import { PdfViewerModalComponent } from '../../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from '../../../../../../components/shared/services/message-modal-service';
import { Subscription } from 'rxjs';
import { InternalTransferService } from './internal-transfer.service';

@Component({
  selector: 'app-internal-transfers',
  templateUrl: './internal-transfers.component.html',
  styleUrls: ['./internal-transfers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InternalTransfersComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['company_name','pf_status','pension_status','superannuation_status','gratuity_status','action'];
  dataSource = [];

  constructor(
    public dialog: MatDialog,
    private messageModalService: MessageModalService,
    private internalTransferService: InternalTransferService
  ) { }

  ngOnInit(): void {
    this.getItList()
  }

  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  openDetailsPopup(rowData) {
    this.dialog.open(InternalTransferDetailsPopupComponent, {
      width: '683px',
      data: {
        rowData: Object.assign({},rowData)
      }
    });
  }

  openStatusPopup(type,status,rowData) {
    if (status == 'A') {
      this.messageModalService.showMessage(
        'Currently Employed.',
        'Error',
        'warning-icon',
        'CLOSE'
      );
    }else {
      this.getPDF(type,status,rowData)   
    }
  }

  getPDF(type,status,rowData){
    let dateOfLeaving = rowData.dateOfLeaving
    let dialogTitle: string;
    switch (type) {
      case 'PF': {
        dialogTitle = 'PF Status';
        break;
      }
      case 'PN': {
        dialogTitle = 'Pension Status';
        break;
      }
      case 'SA': {
        dialogTitle = 'Superannuation Status';
        break;
      }
      case 'GR': {
        dialogTitle = 'Gratuity Status';
        break;
      }
    }
    this.subscriptionsList.push(this.internalTransferService.getPDF(dateOfLeaving,status, type ).subscribe(
      (data: any)=>{
        if(data){
          this.openITPdf(data,dialogTitle)

        }
      }
    ))
  }

  openITPdf(data, dialogTitle) {
    let file = new Blob([data], { type: 'application/pdf' });
    let pdfUrl = URL.createObjectURL(file);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.title = dialogTitle;
    dialogRef.componentInstance.pdfUrl = pdfUrl;

    this.subscriptionsList.push(
      dialogRef.afterClosed().subscribe((res)=>{
        this.getItList()
      })
    )
  }

  getItList(){
    this.subscriptionsList.push(this.internalTransferService.getITList().subscribe(
      (data: any)=>{
        if(data.length > 0){
        this.dataSource = data
        }
      }
    ))
  }

}
