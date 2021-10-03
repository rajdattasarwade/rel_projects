import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PmeService } from '../pme.service';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-pme-centers-modal',
  templateUrl: './pme-centers-modal.component.html',
  styleUrls: ['./pme-centers-modal.component.css']
})
export class PmeCentersModalComponent implements OnInit,OnDestroy {

  showZoomButtons: boolean = false;
  zoomLevel = 1;
  pdfUrl: any = '';
  pdfName: string;
  statesDropDown=[]
  cityDropDown=[]
  stateCode:any=''
  cityCode:any=''
  public subscriptionsList: Subscription[] = [];
  constructor(public dialogRef: MatDialogRef<PmeCentersModalComponent>,private pmeService:PmeService,private messageService: MessageModalService) { }

  ngOnInit(): void {
    this.getStates()
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
  getStates(){
    
    this.subscriptionsList.push(this.pmeService.getCentresState().subscribe((data:any)=>{
      console.log(data)
      this.statesDropDown=data
      
    }))
  }
getCities(stateCode){
  this.cityDropDown=[]
    this.cityCode=''
    this.pdfUrl=''
  this.subscriptionsList.push(this.pmeService.getCentresCities(stateCode).subscribe((data:any)=>{
    if(data.length>0){
    this.cityDropDown=data
    }
    else{
      this.messageService.showMessage(
        'No Tieup hospitals available for selected State',
        'Error',
        'warning-icon',
        'CLOSE'
      );
    }
  }))
}
getHospitals(stateCode,cityCode){
this.subscriptionsList.push(this.pmeService.getCentresHospital(stateCode,cityCode).subscribe((data:any)=>{
  if(data){
    let file = new Blob([data],{type: 'application/pdf'});
    let pdfUrl = URL.createObjectURL(file);
    this.pdfUrl=pdfUrl
    console.log(this.pdfUrl)
  }
}))
}
okClick(){
  this.dialogRef.close()
}
}
