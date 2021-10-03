import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-viewer-modal',
  templateUrl: './pdf-viewer-modal.component.html',
  styleUrls: ['./pdf-viewer-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerModalComponent implements OnInit {
  sendEmail: string;
  pdfUrl: any;
  title: string = '';
  zoomLevel = 1;
  pdfName: string;
  showZoomButtons: boolean = false;
  dismissCallback: (callbackValue: any) => {};
  constructor(public dialogRef: MatDialogRef<PdfViewerModalComponent>) {}

  ngOnInit(): void {}
  downloadPdf() {
    var fileLink = document.createElement('a');
    fileLink.href = this.pdfUrl;
    fileLink.download = this.pdfName;
    fileLink.click();
  }

  zoom(zoomIn: boolean = true) {
    this.zoomLevel = zoomIn ? this.zoomLevel + 0.4 : this.zoomLevel - 0.4;
  }
  closeModal() {
    this.dialogRef.close();
  }
  onDismiss(dismissBtn: string, autodismiss: boolean = true) {
    if (this.dismissCallback) {
      this.dismissCallback(dismissBtn);
    }
    if (autodismiss) {
      this.dialogRef.close();
    }
  }
}
