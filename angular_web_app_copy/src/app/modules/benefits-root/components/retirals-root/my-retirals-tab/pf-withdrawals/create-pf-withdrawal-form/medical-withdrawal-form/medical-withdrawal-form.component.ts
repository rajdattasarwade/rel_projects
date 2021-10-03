import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AmountAppliedInfoPopupComponent } from '../amount-applied-info-popup/amount-applied-info-popup.component';
import { Subscription } from 'rxjs';
import { WithdrawalService } from '../../withdrawal.service';
import {WithdrawalModelDetails} from '../../withdrawal.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-medical-withdrawal-form',
  templateUrl: './medical-withdrawal-form.component.html',
  styleUrls: ['./medical-withdrawal-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicalWithdrawalFormComponent implements OnInit,OnDestroy,AfterViewInit {
  public subscriptionsList: Subscription[] = [];
  medicalFieldFlag:boolean
  commonData:any={}
  formGroup:FormGroup
  disabledatePickerFlag: boolean=false;
  constructor(
    public dialog: MatDialog,
    public withdrawalServices:WithdrawalService
  ) { }

  ngOnInit(): void {
    this.createFormGroup([])
    this.subscriptionsList.push(this.withdrawalServices.commonformData.subscribe((data:any)=>{
      this.commonData=data
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
  ngAfterViewInit():void{
    this.subscriptionsList.push(this.withdrawalServices.formSelected.subscribe((data:any)=>{
      console.log(data)
      
      if(data=='007'){
        // this.varishtpensionFieldFlag=false
        this.medicalFieldFlag=true
        
      }
      else {
        
        this.medicalFieldFlag=false
        
      }
     
    }))
    
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
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  openAmountInfoPopup() {
    this.dialog.open(AmountAppliedInfoPopupComponent, {
      width: '500px'
    });
  }
  editFormGroup(data){
    this.formGroup = new FormGroup({
      amountApplied: new FormControl(data.applyAmount, Validators.required),
      accountNumber: new FormControl(data.accountNo),
      ifscCode: new FormControl(data.ifscCode),
      bankName: new FormControl(data.bankName),
      payeeName: this.medicalFieldFlag==true?new FormControl(data.payeeName, Validators.required):new FormControl(data.payeeName),
      reason1: new FormControl(data.reason1, Validators.required),
      reason2: new FormControl(data.reason2),
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
  createFormGroup(data) {
    if (data.length > 0) {
      this.formGroup = new FormGroup({
        amountApplied: new FormControl("", Validators.required),
        accountNumber: new FormControl(data[0].accountDetail.accountNumber),
        ifscCode: new FormControl(data[0].accountDetail.ifscCode),
        bankName: new FormControl(data[0].accountDetail.bankName),
        payeeName: this.medicalFieldFlag==true?new FormControl("", Validators.required):new FormControl(""),
        reason1: new FormControl("", Validators.required),
        reason2: new FormControl(""),
        maxNo:new FormControl(''),
        inwardNo:new FormControl('')
        
      })
    }
    else {
      this.formGroup = new FormGroup({
        amountApplied: new FormControl("", Validators.required),
        accountNumber: new FormControl(""),
        ifscCode: new FormControl(""),
        bankName: new FormControl(""),
        payeeName: this.medicalFieldFlag==true?new FormControl("", Validators.required):new FormControl(""),
        reason1: new FormControl("", Validators.required),
        reason2: new FormControl(""),
        maxNo:new FormControl(''),
        inwardNo:new FormControl('')

      })
    }
    this.withdrawalServices.formEmitter.emit(this.formGroup)
    this.formGroup.valueChanges.subscribe((data => {
      console.log(this.formGroup)
      this.withdrawalServices.formEmitter.emit(this.formGroup)
      console.log(data)
    }))
  }

}
