import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PmeService } from '../pme.service';
import * as moment from 'moment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pme-reports-modal',
  templateUrl: './pme-reports-modal.component.html',
  styleUrls: ['./pme-reports-modal.component.css']
})
export class PmeReportsModalComponent implements OnInit,OnDestroy {
subscriptionsList:Subscription[]=[]
  showZoomButtons: boolean = false;
  zoomLevel = 1;
  pdfUrl: any = '';
  pdfName: string;
  pmeReportsList=[]
  yearList=[]
  selectedYear
  isDataBlob:boolean=true
  htmlString:SafeUrl
  disablePrevious:boolean=false
  disableForward:boolean=true
  leastYear
  constructor(public dialogRef: MatDialogRef<PmeReportsModalComponent>,private pmeService:PmeService,public sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.createYearList()
    this.getPMEReportsList()
    this.selectedYear=new Date().getFullYear()
  }
  createYearList(){
    var currentDate=new Date()
    var currentYear=currentDate.getFullYear()
    
    this.leastYear=2005
    for(let i=currentYear;i>=2005;i--){
      this.yearList.push({
        year:i
      })
    }
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
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

  closeModal() {
    this.dialogRef.close();
  }
getPMEReportsList(){
  this.subscriptionsList.push(this.pmeService.getPMEReportsList().subscribe((data:any)=>{
    for(let i=0;i<data.length;i++){
      data[i].examDate=moment(data[i].examDate).toDate()
    }
    this.pmeReportsList=data
  }))
}
getPMEReports(selectedYear){
for(let i=0;i<this.pmeReportsList.length;i++){
  if(selectedYear==this.pmeReportsList[i].examDate.getFullYear()){
    this.subscriptionsList.push(this.pmeService.getPMEReports(this.pmeReportsList[i].regnNo).subscribe((data:any)=>{
      if(data){
        let blobNew = new Blob([data], {type : 'text/html'});
        const pdfURL = URL.createObjectURL(blobNew);
        this.htmlString=this.sanitizer.bypassSecurityTrustHtml(data)
        this.pdfUrl=pdfURL
        
      }
    },error=>{
      this.pdfUrl=''
      this.htmlString=''
    }))
  }
  else{
    this.pdfUrl=''
    this.htmlString=''
  }
}
}
navigateBack(){
  this.disableForward=false
  console.log(this.selectedYear)
  if(this.selectedYear-1>this.leastYear){
  this.selectedYear -= 1;
  this.getPMEReports(this.selectedYear)
  }
  else{
    this.disablePrevious=true
  }
  
}
navigateForward(){
  this.disablePrevious=false
  console.log(this.selectedYear)
  if(this.selectedYear<new Date().getFullYear()){
    
    this.selectedYear += 1;
    this.getPMEReports(this.selectedYear)
  }
  else{
    
    this.disableForward=true
  }
  
}
}
