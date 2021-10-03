import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { ExpenseReportManagerService } from '../expense-report-manager.service';

@Component({
  selector: 'app-files-model',
  templateUrl: './files-model.component.html',
  styleUrls: ['./files-model.component.css']
})
export class FilesModelComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  attachmentDeta = [];
  constructor(private expenseReportService: ExpenseReportManagerService, private dialog: MatDialog, public dialogRef: MatDialogRef<FilesModelComponent>, private messageModalService: MessageModalService) { }

  ngOnInit(): void { }
  openDocument(attach: any): void {
    if(attach.rType === 'R'){
      this.subscription = this.expenseReportService.getPdfViewReimbursement(attach.rType,attach.refNo, '', attach.liNum).subscribe((data: any) => {
        if(data){
          let name = attach.name.split('.')[0];
          this.openPdf(data, name);
        } else {
          this.openErrorPopup();
        }
      }, error => {
       this.openErrorPopup();
      });
    } else if(attach.rType === 'T'){
      this.subscription = this.expenseReportService.getPdfViewtravel(attach.rType,attach.tripNo, attach.employeeNumber, attach.receiptno).subscribe((data: any) => {
        if(data){
          let name = attach.name.split('.')[0];
          this.openPdf(data, name);
        } 
      }, error => {
        this.openErrorPopup();
      });
    }
  }

  openPdf(data: any, name: string): void {
    let file = new Blob([data],{type: 'application/pdf'});
    let pdfUrl = URL.createObjectURL(file);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = pdfUrl;
    dialogRef.componentInstance.title = name;
    dialogRef.componentInstance.pdfName = name;
  }
  closeModal(): void {
    this.dialogRef.close();
  }
  openErrorPopup(): void {
    this.messageModalService.showMessage(
      'Error in loading attchment, Please try again',
      'Error',
      'warning-icon',
      'CLOSE'
    );
  }
  ngOnDestroy(): void {
    if( this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
