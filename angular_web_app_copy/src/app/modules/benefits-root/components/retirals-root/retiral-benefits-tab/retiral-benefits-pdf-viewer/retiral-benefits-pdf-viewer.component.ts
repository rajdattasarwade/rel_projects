import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RetiralsService } from '../retirals.service';

@Component({
  selector: 'app-retiral-benefits-pdf-viewer',
  templateUrl: './retiral-benefits-pdf-viewer.component.html',
  styleUrls: ['./retiral-benefits-pdf-viewer.component.css', '../../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RetiralBenefitsPdfViewerComponent implements OnInit {
  public subscriptionsList: Subscription[] = [];
  showZoomButtons: boolean = false;
  zoomLevel = 1;
  pdfUrl: any = null;
  pdfName: string;
  yearDropDown=[]
  selectedYear
  leastYear
  disablePrevious:boolean=false
  disableForward:boolean=true
  pdfFlag:any=''
  constructor(
    public dialogRef: MatDialogRef<RetiralBenefitsPdfViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private retiralService:RetiralsService
  ) { }

  ngOnInit(): void {
    this.yearList()
    console.log(this.data,this.data.description.includes('Provident'))
    if(this.data.description.includes('Provident')){
      this.pdfFlag='PF'
      this.pdfName='PFSlip'
    }
    else{
      this.pdfFlag='SA'
      this.pdfName='SASlip'
    }
    this.getPDF(this.selectedYear)
  }


  yearList(){
    
    var current=new Date()
    var currentyear=current.getFullYear()
    this.selectedYear=currentyear
    var leastyear=currentyear-10
    this.leastYear=leastyear
    for(let i=currentyear;i>leastyear;i--){
      this.yearDropDown.push(i)
    }
    console.log(this.yearDropDown)
  }
  downloadPdf() {
    var fileLink = document.createElement('a');
    fileLink.href = this.pdfUrl;
    fileLink.download = this.pdfName+this.selectedYear;
    fileLink.click();
  }

  zoom(zoomIn: boolean = true) {
    this.zoomLevel = zoomIn ? this.zoomLevel + 0.4 : this.zoomLevel - 0.4;
  }

  closeModal() {
    this.dialogRef.close();
  }
navigateBack(){
  this.disableForward=false
  console.log(this.selectedYear)
  if(this.selectedYear-1>this.leastYear){
  this.selectedYear -= 1;
  this.getPDF(this.selectedYear)
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
    this.getPDF(this.selectedYear)
  }
  else{
    
    this.disableForward=true
  }
  
}
getPDF(year){
  
  this.subscriptionsList.push(this.retiralService.getPDF(year,this.pdfFlag).subscribe((data:any)=>{
    if(data){
      let file = new Blob([data],{type: 'application/pdf'});
      let pdfUrl = URL.createObjectURL(file);
      
      this.pdfUrl=pdfUrl
     }
  },
  (error)=>{
    this.pdfUrl=null
  }))
}
yearChange(year){
  if(this.selectedYear<new Date().getFullYear()){
    this.disableForward=false
  }
  else{
    this.disableForward=true
  }
  if(this.selectedYear>this.leastYear){
    this.disablePrevious=false
  }
  else{
    this.disablePrevious=true
  }
  this.getPDF(year)
}
}
