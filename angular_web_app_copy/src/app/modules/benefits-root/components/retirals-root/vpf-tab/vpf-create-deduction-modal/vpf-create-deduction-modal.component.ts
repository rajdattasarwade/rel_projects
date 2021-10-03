import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { VpfService } from '../vpf.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vpf-create-deduction-modal',
  templateUrl: './vpf-create-deduction-modal.component.html',
  styleUrls: ['./vpf-create-deduction-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VpfCreateDeductionModalComponent implements OnInit,OnDestroy {
  public subscriptionsList: Subscription[] = [];
  fromDate:any
  toDate:any
  deductionPercentage:number=0
  formCtrl:NgForm
  selectedType:any
  vpfType:any
  confirmationMsg: string; 

  constructor(private vpfService:VpfService,private messageService:MessageModalService,public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }
  getVPFTypeDetail(event){
    console.log(event.value)
    this.vpfType=event.value
    this.subscriptionsList.push(this.vpfService.getVPFTypeDetail(event.value).subscribe((data:any)=>{
      console.log(data)
      if(data.length>0){
      this.fromDate= data[0].fromDate?moment(data[0].fromDate).format('DD-MM-YYYY'):null
      this.toDate= data[0].toDate?moment(data[0].toDate).format('DD-MM-YYYY'):null
      this.deductionPercentage=data[0].deductionPercentage
      if(data.isCurrent){
        this.showConfirmation(event)
      }
      }
    }))
  }
  lengthValidator(event){
    console.log(event)
    if(this.deductionPercentage<10){
      return true
    }
    else{
      return false
    }
  }
  amountChange(event){
    console.log(event)
    var regex = /^[0-9]*$/

    if (regex.test(event.key) == false) {
      return false
    } else {
      return true
    }
  }
  postVPF(){
    const body={
      "deductionPercentage":this.deductionPercentage,
      "deductionType":this.vpfType
    }
    this.subscriptionsList.push(this.vpfService.postVPF(body).subscribe((data:any)=>{
console.log(data)
if (data.responseStatus == 'FAILED') {
  this.messageService.showMessage(
    data.systemErrMsg,
    'Error',
    'warning-icon',
    'CLOSE'
  );
} else {
  let msg = JSON.parse(data.responseData)
  this.messageService.showMessage(
    'Submitted Successfully',
    'Success',
    'success-icon',
    'CLOSE'
  );
  this.dialogRef.close('success');
}
    }))
  }
  cancel(){
    this.dialogRef.close()
  }
  showConfirmation(event){
    
    this.confirmationMsg='VPF Deduction will be effective from next month'
    this.messageService.showConfirmation(
      this.confirmationMsg,
      'Confirmation',
      'confirmation-icon',
      (reason) => {
        if (reason === 'YES') {
                   
        }
        else{
          this.selectedType=''
          this.dialogRef.close()
        }
      }
    );
  }

}
