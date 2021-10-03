import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AmountAppliedInfoPopupComponent } from '../amount-applied-info-popup/amount-applied-info-popup.component';
import { WithdrawalService} from '../../withdrawal.service'
import { Subscription } from 'rxjs';
import {WithdrawalModelDetails} from '../../withdrawal.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreatePfWithdrawalFormComponent } from '../create-pf-withdrawal-form.component';
import * as moment from 'moment';
@Component({
  selector: 'app-generic-withdrawal-form',
  templateUrl: './generic-withdrawal-form.component.html',
  styleUrls: ['./generic-withdrawal-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GenericWithdrawalFormComponent implements OnInit,AfterViewInit,OnDestroy {
  public subscriptionsList: Subscription[] = [];
  commonData={}
  datefieldDisplayFlag:boolean
  formGroup:FormGroup
  disabledatePickerFlag:boolean=false
  constructor(
    public dialogRef: MatDialogRef<CreatePfWithdrawalFormComponent>,
    public dialog: MatDialog,
    public withdrawalServices:WithdrawalService
  ) { }

  ngOnInit(): void {
    this.createFormGroup([])
    this.subscriptionsList.push(this.withdrawalServices.commonformData.subscribe((data:any)=>{
      this.commonData=data
      console.log(data)
      this.createFormGroup(data)
    }))
    this.subscriptionsList.push(this.withdrawalServices.editDataEmitter.subscribe((data:any)=>{
      console.log(data)
      if(data.flag!='C'){
        this.editFormGroup(data.data)
        if(data.flag=='D'){
          this.disabledatePickerFlag=true
          this.formGroup.disable()
        }
      }
    }))
  }
  editFormGroup(data){
    this.formGroup=new FormGroup({
      amountApplied: new FormControl(data.applyAmount, [Validators.required,Validators.maxLength(12)]),
      accountNumber: new FormControl(data.accountNo),
      ifscCode: new FormControl(data.ifscCode),
      bankName: new FormControl(data.bankName),
      installmentNumber: new FormControl(data.noOfInstallment, Validators.required),
      payeeName: new FormControl(data.payeeName, Validators.required),
      payeeAdd1: new FormControl(data.payeeAddress1, Validators.required),
      payeeAdd2: new FormControl(data.payeeAddress2),
      date: this.datefieldDisplayFlag==true?new FormControl(data.date?moment(data.date).toDate():null,Validators.required):new FormControl(data.date?moment(data.date).toDate():null),
      maxNo:new FormControl(data.maxNo),
      inwardNo:new FormControl(data.inwardNo)
    })
    this.withdrawalServices.formEmitter.emit(this.formGroup)
this.formGroup.valueChanges.subscribe((data=>{
  console.log(this.formGroup)
  this.withdrawalServices.formEmitter.emit(this.formGroup)
  console.log(data)
}))
  }
  createFormGroup(data){
    if(data.length>0){
    this.formGroup=new FormGroup({
      amountApplied: new FormControl("", [Validators.required,Validators.maxLength(12)]),
      accountNumber: new FormControl(data[0].accountDetail.accountNumber),
      ifscCode: new FormControl(data[0].accountDetail.ifscCode),
      bankName: new FormControl(data[0].accountDetail.bankName),
      installmentNumber: new FormControl(1, Validators.required),
      payeeName: new FormControl("", Validators.required),
      payeeAdd1: new FormControl("", Validators.required),
      payeeAdd2: new FormControl("",),
      date: this.datefieldDisplayFlag==true? new FormControl(null,Validators.required):new FormControl(null),
      maxNo:new FormControl(''),
      inwardNo:new FormControl('')
    })
  }
  else{
  this.formGroup=new FormGroup({
    amountApplied: new FormControl("", [Validators.required,Validators.maxLength(12)]),
    accountNumber: new FormControl(''),
    ifscCode: new FormControl(''),
    bankName: new FormControl(''),
    installmentNumber: new FormControl(1, Validators.required),
    payeeName: new FormControl("", Validators.required),
    payeeAdd1: new FormControl("", Validators.required),
    payeeAdd2: new FormControl("",),
    date: this.datefieldDisplayFlag==true? new FormControl(null,Validators.required):new FormControl(null),
    maxNo:new FormControl(''),
    inwardNo:new FormControl('')
  })
}
this.withdrawalServices.formEmitter.emit(this.formGroup)
this.formGroup.valueChanges.subscribe((data=>{
  console.log(this.formGroup)
  this.withdrawalServices.formEmitter.emit(this.formGroup)
  console.log(data)
}))
  }
  
  ngAfterViewInit():void{
    this.subscriptionsList.push(this.withdrawalServices.formSelected.subscribe((data:any)=>{
      console.log(data)
      if(data=='005' || data=='006'){
        this.datefieldDisplayFlag=true
      }
      else{
        this.datefieldDisplayFlag=false
      }
    }))
 
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }
  amountChange(event){
    // console.log(event)
    var regex = /^[0-9.]*$/

    if (regex.test(event.key) == false) {
      return false
    } else {
      return true
    }
  }
  openAmountInfoPopup() {
    this.dialog.open(AmountAppliedInfoPopupComponent, {
      width: '500px'
    });
  }
  closeModal() {
    this.dialogRef.close();
  }


}
