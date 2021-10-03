import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NpsDeductionModalComponent } from './nps-deduction-modal/nps-deduction-modal.component';
import {NpsService} from './nps.service'
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
@Component({
  selector: 'app-nps-tab',
  templateUrl: './nps-tab.component.html',
  styleUrls: ['./nps-tab.component.css']
})

export class NpsTabComponent implements OnInit ,OnDestroy{
  isShown: boolean = false ; // hidden by default
  enrollNps=''  ; // hidden by default
  displayedColumns: string[] = ['fromdate', 'todate', 'status', 'amount', 'edit'];
  pranNo:any=''
  newpranNo:any=''
  repranNo:any=''
  dataSource = new MatTableDataSource([]);
  public subscriptionsList: Subscription[] = [];
  constructor(public dialogRef: MatDialogRef<NpsDeductionModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public activeModal: MatDialog,private npsService:NpsService,
  private messageService:MessageModalService) { }
  ngOnInit(): void {
    this.getPRANDetails() 
    
   }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }
  toggleShow() {
    this.isShown = ! this.isShown;
  }
  openNpsDeduction(element) {
    const dialogRef = this.activeModal.open(NpsDeductionModalComponent, {
      width: '683px',
      data: {
        data: Object.assign({},element)
    }});
    dialogRef.afterClosed().subscribe(resp=>{
      this.getPRANDetails() 
    })
  }
  getNPSOverview(){
    this.subscriptionsList.push(this.npsService.getNPSOverview().subscribe((data:any)=>{
      console.log(data)
      
      if(data.length!=0){
        for(let i=0;i<data.length;i++){
          data[i].startDate=moment(data[i].startDate).format('DD-MM-YYYY')
          data[i].endDate=moment(data[i].endDate).format('DD-MM-YYYY')
          data[i].effectiveDate=moment(data[i].effectiveDate).toDate()
          
        }
      }
      this.dataSource=new MatTableDataSource(data)
    }))
  }
  getPRANDetails(){
    this.subscriptionsList.push(this.npsService.getPRANDetails().subscribe((data:any)=>{
      console.log(data)
      this.pranNo=data.pranNo
      
      if(this.pranNo==''){
        this.enrollNps='C'
      }
      else{
        this.enrollNps='E'
        this.getNPSOverview()
      }
    }))
  }
  onPaste(event){
    return false
  }

  savePRAN(){
    const body={
      "bank":"",
      "pranNo":this.newpranNo,
      "rePranNo":this.repranNo
    }
    this.subscriptionsList.push(this.npsService.savePRAN(body).subscribe((data:any)=>{
      console.log(data)
      if (data.responseStatus == 'FAILED') {
        this.messageService.showMessage(
          data.systemErrMsg,
          'Error',
          'warning-icon',
          'CLOSE'
        );
      } else {
        let msg=''
        if(data.responseData){
         msg= JSON.parse(data.responseData)
        }
        this.messageService.showMessage(
          msg,
          'Success',
          'success-icon',
          'CLOSE',
          ()=>this.getPRANDetails()
        );
   
      }
      

          }))
  }
}
