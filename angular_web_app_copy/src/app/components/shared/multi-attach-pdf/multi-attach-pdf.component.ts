import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PdfViewerModalComponent } from '../pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-multi-attach-pdf',
  templateUrl: './multi-attach-pdf.component.html',
  styleUrls: ['./multi-attach-pdf.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MultiAttachPdfComponent implements OnInit {
  attachmentDet: any = [];

  constructor(
    private activeModal: MatDialog,
    public dialogRef: MatDialogRef<MultiAttachPdfComponent>
  ) {}

  ngOnInit(): void {}

  emitDocId(docId) {
    this.dialogRef.close(docId);
  }

  openPdf() {
    let pdfUrl;
    const dialogRef = this.activeModal.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = pdfUrl;
    dialogRef.componentInstance.title = '';
    dialogRef.componentInstance.pdfName = '';
  }

  closeModal() {
    this.dialogRef.close('');
  }
}
