import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AmountAppliedInfoPopupComponent } from '../amount-applied-info-popup/amount-applied-info-popup.component';
import { WithdrawalService } from '../../withdrawal.service';
import { Subscription } from 'rxjs';
import { WithdrawalModelDetails } from '../../withdrawal.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-insurance-withdrawal-form',
  templateUrl: './insurance-withdrawal-form.component.html',
  styleUrls: ['./insurance-withdrawal-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InsuranceWithdrawalFormComponent implements OnInit, AfterViewInit, OnDestroy {
  public subscriptionsList: Subscription[] = [];
  commonData = {}
  formGroup: FormGroup
  minDate:Date
  maxDate:Date
  disabledatePickerFlag:boolean=false
  constructor(
    public dialog: MatDialog,
    public withdrawalServices: WithdrawalService
  ) { }

  ngOnInit(): void {
    this.createFormGroup([])
    this.subscriptionsList.push(this.withdrawalServices.commonformData.subscribe((data: any) => {
      this.commonData = data
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
  dateChangeStart(date){
    console.log(date)
    this.minDate=date.toDate()
  }
  dateChangeEnd(date){
    console.log(date)
    this.maxDate=date.toDate()
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
  policyChange(event){
    // console.log(event)
    var regex = /^[A-Za-z0-9]*$/

    if (regex.test(event.key) == false) {
      return false
    } else {
      return true
    }
  }
  ngAfterViewInit(): void {
    this.subscriptionsList.push(this.withdrawalServices.formSelected.subscribe((data: any) => {
      console.log(data)
    }))
    
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
      micr: new FormControl(data.micr),
      branch: new FormControl(data.branch, Validators.required),
      bankAddress1: new FormControl(data.bankAddress1, Validators.required),
      bankAddress2: new FormControl(data.bankAddress2),
      bankAddress3: new FormControl(data.bankAddress3),
      insurancepolicy: new FormControl(data.insurancePolicyNo, Validators.required),
      policyStart: new FormControl(data.policyStartDate?moment(data.policyStartDate).toDate():null,Validators.required),
      policyEnd: new FormControl(data.policyEndDate?moment(data.policyEndDate).toDate():null,Validators.required),
      premiumDay: new FormControl(data.premiumDate),
      premiumMonth:new FormControl(data.premiumMonth),
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
        micr: new FormControl(''),
        branch: new FormControl('', Validators.required),
        bankAddress1: new FormControl('', Validators.required),
        bankAddress2: new FormControl(''),
        bankAddress3: new FormControl(''),
        insurancepolicy: new FormControl('', Validators.required),
        policyStart: new FormControl(null,Validators.required),
        policyEnd: new FormControl(null,Validators.required),
        premiumDay: new FormControl(''),
        premiumMonth:new FormControl(''),
        maxNo:new FormControl(''),
        inwardNo:new FormControl('')

      })
    }
    else {
      this.formGroup = new FormGroup({
        amountApplied: new FormControl("", Validators.required),
        micr: new FormControl(''),
        branch: new FormControl('', Validators.required),
        bankAddress1: new FormControl('', Validators.required),
        bankAddress2: new FormControl(''),
        bankAddress3: new FormControl(''),
        insurancepolicy: new FormControl('', Validators.required),
        policyStart: new FormControl(null,Validators.required),
        policyEnd: new FormControl(null,Validators.required),
        premiumDay: new FormControl(''),
        premiumMonth:new FormControl(''),
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
