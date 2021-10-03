import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GratuityService } from '../../gratuity.service';
import { MessageModalService } from '../../../../../../../components/shared/services/message-modal-service';

@Component({
  selector: 'app-gratuity-pdf-viewer',
  templateUrl: './gratuity-pdf-viewer.component.html',
  styleUrls: [
    './gratuity-pdf-viewer.component.css',
    '../../../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class GratuityPdfViewerComponent implements OnInit {
  public subscriptionsList: Subscription[] = [];
  showZoomButtons: boolean = false;
  zoomLevel = 1;
  pdfUrl: any = '';
  // 'assets/Payslip202006.pdf'
  pdfName: string;
  declarationList: any = [];

  constructor(
    public dialogRef: MatDialogRef<GratuityPdfViewerComponent>,
    public gratuityService: GratuityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.declarationList = this.data.declarationList;
    this.pdfUrl = this.data.pdfUrl ? this.data.pdfUrl : '';
  }

  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe();
      });
    }
  }

  downloadPdf() {
    var fileLink = document.createElement('a');
    fileLink.href = this.pdfUrl;
    fileLink.download = this.pdfName;
    fileLink.click();
  }

  zoom(zoomIn: boolean = true) {
    this.zoomLevel = zoomIn ? this.zoomLevel + 0.4 : this.zoomLevel - 0.4;
  }

  submitDeclaration() {
    let payload = this.gratuityService.createPayload(this.declarationList, 'S');

    this.subscriptionsList.push(
      this.gratuityService
        .saveGratuityDeclaratiom(payload)
        .subscribe((data: any) => {
          if (data.responseStatus == 'SUCCESS') {
            let msg = 'Submitted Successfully';
            this.messageService.showMessage(
              msg,
              'Success',
              'success-icon',
              'CLOSE',
              () => {
                this.dialogRef.close('success');
                this.gratuityService.closeAllModal.emit(true);
              }
            );
          } else {
            let errorMsg = data.systemErrMsg ? data.systemErrMsg : '';
            this.messageService.showMessage(
              errorMsg,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          }
        })
    );
  }

  closeModal() {
    this.dialogRef.close();
  }
}
