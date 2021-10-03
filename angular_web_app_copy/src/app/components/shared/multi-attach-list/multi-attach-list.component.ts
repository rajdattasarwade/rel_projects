import { SimplePlaceholderMapper } from '@angular/compiler/src/i18n/serializers/serializer';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ReimbursementsService } from 'src/app/modules/reimbursements-root/services/reimbursements.service';
import { PdfViewerModalComponent } from '../pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-multi-attach-list',
  templateUrl: './multi-attach-list.component.html',
  styleUrls: ['./multi-attach-list.component.css'],
})
export class MultiAttachListComponent implements OnInit {
  attachmentDet: any;
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  opr: any;

  constructor(
    public dialogRef: MatDialogRef<MultiAttachListComponent>,
    private reimbursmentService: ReimbursementsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }

  openDocument(attachmentDet) {
    this.dialogRef.close();
    var payload = {
      sapCode: attachmentDet.attachDoc.reimbursementType,
      claimNo: attachmentDet.attachDoc.claimNumber,
      lineNo: attachmentDet.attachDoc.lineNumber,
    };
    this.subscriptionsList.push(
      this.reimbursmentService.openAttachment(payload).subscribe(
        (res: Blob) => {
          console.log(res);
          if (res) {
            let file = new Blob([res], { type: 'application/pdf' });
            var pdfUrl = URL.createObjectURL(file);
            if (this.opr == 'attachment') {
              const dialogRef = this.dialog.open(PdfViewerModalComponent);
              dialogRef.componentInstance.pdfUrl = pdfUrl;
              dialogRef.componentInstance.title =
                attachmentDet.attachDoc.fileName;
                dialogRef.componentInstance.pdfName =  attachmentDet.attachDoc.fileName;
            } else {
              window.open(pdfUrl);
            }
          }
        },
        (error) => {}
      )
    );
  }
}
