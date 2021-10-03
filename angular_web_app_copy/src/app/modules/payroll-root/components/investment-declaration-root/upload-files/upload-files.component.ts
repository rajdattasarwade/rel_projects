import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InvestmentDeclarationRootService } from '../investment-declaration-root.service';
import { Section80CHeaderDetail } from '../section-80c/section-80c.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Section80dHeaderDetail } from '../section80d/section80d.model';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css'],
})
export class UploadFilesComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @Input() element: Section80CHeaderDetail;
  @Input() elementD: Section80dHeaderDetail;
  fileObj: any;
  file: any;
  fileToDownloadUrl: any;
  fileNameToSave: string;
  @Input() attachmentAvailable: boolean;
  @Input() edit: boolean;
  uploadHeaderText: string;
  fileSizeLimit: number = 1024 * 1024;
  existingFilesArray:any[]=[];
  acceptedFormats = ['.pdf'];
  constructor(
    private service: InvestmentDeclarationRootService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UploadFilesComponent>,
    public messageModalService: MessageModalService
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.uploadHeaderText = this.edit ? 'Upload File' : 'Uploaded File';
    console.log('attach to element =>', this.element);
    this.attachmentAvailable &&
      this.element &&
      this.getAttachment80Pdf(this.element, 'SEC80C');
    this.attachmentAvailable &&
      this.elementD &&
      this.getAttachment80Pdf(this.elementD, 'SEC80D');
  }
  checkFormValidity(): boolean {
    return this.fileObj ? true : false;
  }
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      console.log('file size=>', event.target.files[0].size);
      // if (event.target.files[0].size > 1024 * 1024) {
      //   this.largeFileError();
      // }

      this.removedOnce = false;
      console.log('event=>', event.target.files[0]);
      this.fileObj = event.target.files[0];
    }
  }
  onFileChange2(files) {
    if (files && files[0]) {
      console.log('file size=>', files[0].size);
      // if (files[0].size > 1024 * 1024) {
      //   this.largeFileError();
      // }

      this.removedOnce = false;
      console.log('file=>', files[0]);
      this.fileObj = files[0];
      this.existingFilesArray.push(files[0]);
    }
  }
  largeFileError() {
    var msg =
      'File size exceeded allowed limit. Please select pdf file with size less than 2MB.';
    var status = 'Error';
    var icon = 'warning-icon';
    this.messageModalService.showMessage(msg, status, icon, 'CLOSE', () => {
      this.ngOnInit();
    });
  }
  clearFile() {
    console.log('clear file');
    this.fileObj = [];
    this.dismiss();
  }
  onClear() {
    console.log('clear file');
    this.fileObj = null;
    this.removedOnce = true;
    // this.dismiss();
  }
  attachFile() {
    console.log('attach file');
    if (this.fileObj) {
      console.log(' attchFile C=>', this.element);
      console.log(' attchFile D=>', this.elementD);
      this.element &&
        this.service.addToAttachFileMap80C(this.element, this.fileObj);
      this.elementD &&
        this.service.addToAttachFileMap80D(this.elementD, this.fileObj);
      this.dismiss();
    }
  }
  removedOnce: boolean = false;
  saveRemoveAttachment() {
    if (this.removedOnce) {
      this.fileObj = null;
      this.removedOnce = false;
      this.element && this.service.removeFromAttachFileMap80C(this.element);
      this.elementD && this.service.removeFromAttachFileMap80D(this.elementD);
      this.dismiss();
    }
  }
  dismiss() {
    console.log('dismiss');
    this.dialogRef.close();
  }

  viewPDF() {
    console.log('viewPDF,file=>', this.fileObj);
    let fileUrl = URL.createObjectURL(this.fileObj);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = fileUrl;
    dialogRef.componentInstance.title = 'Attached File';
  }

  getAttachment80Pdf(element, type) {
    let docId = element.attachmentProofDetail.documentId;
    if (element.attachFlag) {
      var sub = this.service.getPdfview(type, docId).subscribe(
        (data: any) => {
          var file = new Blob([data], { type: 'application/pdf' });
          this.fileObj = file;
          this.fileToDownloadUrl = URL.createObjectURL(this.fileObj);
          this.fileNameToSave = this.fileObj.name;
          console.log('fileName=>', this.fileNameToSave);
          type == 'SEC80C' && this.popuate80cAttachmentFile(element, file);
          type == 'SEC80D' && this.popuate80dAttachmentFile(element, file);
        },
        (err) => {
          console.log('error');
        }
      );
      this.subscription.add(sub);
    } else {
      type == 'SEC80C' && this.popuate80cAttachmentFile(element, null);
      type == 'SEC80D' && this.popuate80dAttachmentFile(element, null);
    }
  }

  popuate80cAttachmentFile(element, file) {
    console.log('populate file 80c =>', file);
    if (file) {
      console.log('true file');
      this.fileObj = file;
      this.service.addToAttachFileMap80C(element, file);
    } else {
      this.fileObj = this.service.attachFileMap80C.get(element.lineNumber);
      console.log(
        'file is not available fetch from map is available there',
        this.fileObj
      );
    }
  }
  popuate80dAttachmentFile(element, file) {
    console.log('populate file 80d =>', file);
    if (file) {
      console.log('true file');
      this.fileObj = file;
      this.service.addToAttachFileMap80D(element, file);
    } else {
      console.log('file is not available fetch from map is available there');
    }
  }
  fileUploadEvet(event) {}

  filesDropped(event) {
    console.log('filesDropped event=>', event);
    console.log('file attacg drag drop ', event);
    this.onFileChange2(event.files);
    this.fileToDownloadUrl = event.imageUrls;
  }
  viewClicked(event) {
    console.log('viewClickedevent->', event);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = event.imageUrlClicked;
    dialogRef.componentInstance.title = event.fileClicked.name;
  }
  filesDeleted(event) {
    console.log('filesDeleted=>');
    this.onClear();
  }
}
