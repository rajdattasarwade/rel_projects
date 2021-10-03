import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BenefitsService } from '../../../services/benefits.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoModalComponent implements OnInit {
  documentList:any;
  constructor(public benifitService:BenefitsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDocuments();
  }
  getDocuments() {
    let docList = this.benifitService.getGuidelines('H0081').subscribe(((response: any) => {
      this.documentList=response;
    }))
    //this.subManager.add(docList);
  }
  closeModal() {
    this.dialog.closeAll()
  }
  openPdf(data) {
    if(data.appName=='5'){
      this.geCovClvVedio(data);
    }else{
      let pdfData = this.benifitService.openGuidelinesPdf(data.docId).subscribe(data => {
        window.open(URL.createObjectURL(data)) 
        })
    }
  }

  //guidelines vedio
  geCovClvVedio(data){
      let GuiVedData = this.benifitService.openGuidelinesVedio(data).subscribe(
        (data:any) => {
         window.open(data.exUrl) 
        })
    }
}
