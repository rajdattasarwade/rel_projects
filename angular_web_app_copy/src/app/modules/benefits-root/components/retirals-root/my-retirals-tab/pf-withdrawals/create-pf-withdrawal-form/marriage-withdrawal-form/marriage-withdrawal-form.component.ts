import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AmountAppliedInfoPopupComponent } from '../amount-applied-info-popup/amount-applied-info-popup.component';
import { Subscription } from 'rxjs';
import { WithdrawalService } from '../../withdrawal.service';
import { WithdrawalModelDetails } from '../../withdrawal.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-marriage-withdrawal-form',
  templateUrl: './marriage-withdrawal-form.component.html',
  styleUrls: ['./marriage-withdrawal-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MarriageWithdrawalFormComponent implements OnInit, OnDestroy, AfterViewInit {
  public subscriptionsList: Subscription[] = [];
  marriagefieldFlag: boolean
  varishtpensionFieldFlag: boolean
  commonData: any = {}
  formGroup: FormGroup
  relationData=[]
  disableRelation:boolean=false
  disabledatePickerFlag:boolean=false
  constructor(
    public dialog: MatDialog,
    public withdrawalServices: WithdrawalService
  ) { }

  ngOnInit(): void {
    this.createFormGroup([])
    this.subscriptionsList.push(this.withdrawalServices.commonformData.subscribe((data: any) => {
      this.commonData = data
      console.log(data)
      this.relationData=data[0].relation
      this.relationData.splice(0,1)
      console.log(this.relationData)
      
      this.createFormGroup(this.commonData)
    }))
    this.subscriptionsList.push(this.withdrawalServices.editDataEmitter.subscribe((data:any)=>{
      console.log(data)
      
      if(data.flag!='C'){
        this.editFormGroup(data.data)
        if(data.flag=='D'){
          this.disableRelation=true
          this.disabledatePickerFlag=true
          this.formGroup.disable()
        }
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
  ngAfterViewInit(): void {
    this.subscriptionsList.push(this.withdrawalServices.formSelected.subscribe((data: any) => {
      console.log(data)

      if (data == '008') {
        this.varishtpensionFieldFlag = false
        this.marriagefieldFlag = true

      }
      else if (data == '011') {
        this.varishtpensionFieldFlag = false
        this.marriagefieldFlag = false

      }
      else if (data == '012') {
        this.marriagefieldFlag = false
        this.varishtpensionFieldFlag = true

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
      name:this.marriagefieldFlag==true ? new FormControl(data.name, Validators.required):new FormControl(data.name),
      relation:this.marriagefieldFlag==true ? new FormControl(data.relationTypeCode, Validators.required):new FormControl(data.relationTypeCode),
      date:this.varishtpensionFieldFlag==false? new FormControl(data.date?moment(data.date).toDate():null,Validators.required):new FormControl(null),
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
        name:this.marriagefieldFlag==true ? new FormControl("", Validators.required):new FormControl(""),
        relation:this.marriagefieldFlag==true ? new FormControl("", Validators.required):new FormControl(""),
        date: this.varishtpensionFieldFlag==false? new FormControl(null,Validators.required):new FormControl(null),
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
        name: this.marriagefieldFlag==true ? new FormControl("", Validators.required):new FormControl(""),
        relation: this.marriagefieldFlag==true ? new FormControl("", Validators.required):new FormControl(""),
        date:this.varishtpensionFieldFlag==false? new FormControl(null,Validators.required):new FormControl(null),
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
