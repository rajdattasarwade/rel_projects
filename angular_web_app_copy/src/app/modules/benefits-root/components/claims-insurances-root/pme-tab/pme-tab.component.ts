import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PmeCentersModalComponent } from './pme-centers-modal/pme-centers-modal.component';
import { PmeReportsModalComponent } from './pme-reports-modal/pme-reports-modal.component';
import { AppointmentModalComponent } from './pme-centers-modal/appointment-modal/appointment-modal.component'
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { PmeService} from './pme.service'
import * as moment from 'moment';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';


@Component({
  selector: 'app-pme-tab',
  templateUrl: './pme-tab.component.html',
  styleUrls: ['./pme-tab.component.css']
})
export class PmeTabComponent implements OnInit ,OnDestroy{
  displayedColumns: any = ['pmeFor','period','age','eligibleAmt','pmeInitiated','pmeAvailed','pmeType', 'action'];
  dataSource =new MatTableDataSource([])
  public subscriptionsList: Subscription[] = [];
  pdfUrl:any=''


  constructor(public dialogRef: MatDialogRef<PmeTabComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public activeModal: MatDialog,
  private pmeService:PmeService,private messageService:MessageModalService) { }

  ngOnInit(): void {
    this.getPMEOverview()
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }
  openPmeReports() {
    const dialogRef = this.activeModal.open(PmeReportsModalComponent, {
      width: '683px', 
    });
  }
  openPmeCenters()  {
    const dialogRef = this.activeModal.open(PmeCentersModalComponent, {
      width: '683px', 
    });
  }
openPmeAppointment(element){
  const dialogRef=this.activeModal.open(AppointmentModalComponent,{
    width: '683px',
    data:element
  })
}
  getPMEOverview(){
    this.subscriptionsList.push(this.pmeService.getPMEOverview().subscribe((data:any)=>{
      console.log(data)
      if(data.length>0){
      for(let i=0;i<data.length;i++){
        data[i].eligibleFrom=moment(data[i].eligibleFrom).format('DD.MM.YYYY')
        data[i].eligibleTo=moment(data[i].eligibleTo).format('DD.MM.YYYY')
        data[i].pmeInit=data[i].pmeInit==true?'Yes':''
        data[i].pmeAvailed=data[i].pmeAvailed==true?'Yes':''
      }
      this.dataSource=new MatTableDataSource(data)
      }
    }))
  }
 printPME(element){
  var confirmationMsg='Do you want to request an appointment with Sir H N Reliance Foundation Hospital, MUMBAI?'
  this.messageService.showConfirmation(
    confirmationMsg,
    'Confirmation',
    'confirmation-icon',
    (reason) => {
      if (reason === 'YES') {
        this.openPmeAppointment(element)         
      }
      else{
        this.getPMEPDF(element)
      }
    }
  );
 }
 getPMEPDF(element){
   const body={
     age:element.age,
     amount:element.amount,
     pmeUser:element.pmeFor
   }
   this.subscriptionsList.push(this.pmeService.getPMEPDF(body).subscribe((data:any)=>{
     if(data){
      let file = new Blob([data],{type: 'application/pdf'});
      let pdfUrl = URL.createObjectURL(file);
      this.pdfUrl=pdfUrl
      console.log(this.pdfUrl)
      
      const dialogRef = this.activeModal.open(PdfViewerModalComponent);
            dialogRef.componentInstance.pdfUrl = this.pdfUrl;
            dialogRef.componentInstance.title = 'PME Letter';
            dialogRef.componentInstance.pdfName = "PME Letter";
     }
   }))
 }
}
