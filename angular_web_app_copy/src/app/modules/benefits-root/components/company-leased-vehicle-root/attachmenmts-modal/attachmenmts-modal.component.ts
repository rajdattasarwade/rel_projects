import { Component, OnInit } from '@angular/core';
import { BenefitsService } from '../../../services/benefits.service';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerModalComponent } from '../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-attachmenmts-modal',
  templateUrl: './attachmenmts-modal.component.html',
  styleUrls: ['./attachmenmts-modal.component.css']
})
export class AttachmenmtsModalComponent implements OnInit {
overviewObject
acceptedFormats: any = ['.jpg','.png','.pdf']; 
attachFiles: any[]= [];
fileName:string;
displayFiles: any[] = [];
viewMode:boolean=false;
notAllowedUpload:boolean=false;
docName:string='';
  constructor(private benifitService : BenefitsService,private dialog:MatDialog) { }

  ngOnInit(): void { 
    if(this.overviewObject.filePath !='' && this.overviewObject.status !='01'){
      this.docName="Document";
      this.viewMode =true;
      let obj ={
        name:this.docName,
      }
      this.displayFiles.push(obj);
      this.attachFiles.push(this.overviewObject.filePath);
    } else if(this.overviewObject.filePath !="" && this.overviewObject.status =='01'){
        this.docName="Document";  
        this.viewMode =false;
          let obj ={
            name:this.docName,
        }
        this.displayFiles.push(obj);
        this.attachFiles.push(this.overviewObject.filePath);
    } else if(this.overviewObject.filePath =="" && this.overviewObject.status =='01'){
      this.viewMode =false;
    } else {
      this.notAllowedUpload =true;
    }
  }
  onFileDrops(data){
    this.attachFilesList(data.files);
  }
  attachFilesList(files){
    if(files.length>0){
      this.attachFiles.push(files[0]);
      this.fileName = files[0].name;
      this.uploadAttachment();
    }
  }
  uploadAttachment(){
    this.benifitService
      .addAttachment(this.attachFiles[0])
      .subscribe(
        (data: any) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteAttachmentFile(event) {
    this.fileName ='';
    this.attachFiles = [];
  }

  openPdf(data: any): void {
    let name = '';    
    if(data.imageUrlClicked){
      name = data.fileClicked.name.split('.')[0];
      this.onViewPdf(data.fileClicked, name);
    } else {
      name = this.attachFiles[0] ? this.attachFiles[0]:'ORIX@sample.pdf';
     
     this.benifitService.openAttachment(name).subscribe((data: any) => {
        if(data){
           this.onViewPdf(data, this.docName); 
        }
      }, error => {
        console.log(error);
      })
     
    }
  }
  onViewPdf(data: any, name: string): void {
    let file = new Blob([data],{type: 'application/pdf'});
    let pdfUrl = URL.createObjectURL(file);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = pdfUrl;
    dialogRef.componentInstance.title = name;
    dialogRef.componentInstance.pdfName = name;
  }
  closeModal(){
    this.dialog.closeAll();
  }

}
