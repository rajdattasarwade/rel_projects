import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BenefitsService } from '../../../services/benefits.service';
import { FormGroup, FormControl, Validators } from '../../../../../../../node_modules/@angular/forms';
import { getYear,getMonth,getDate } from 'date-fns';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { DetailsCOV } from '../../../benifit-model';

@Component({
  selector: 'app-cov-buyback',
  templateUrl: './cov-buyback.component.html',
  styleUrls: ['./cov-buyback.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CovBuybackComponent implements OnInit {
  overviewObject:any
  cOVDetails:DetailsCOV;
  addCOVBuyback:FormGroup;
  viewMode:boolean=true;
  setMaxDate:any;
  constructor(private benifitService:BenefitsService,
              private dialogRef: MatDialogRef<any>,
              private messageService:MessageModalService
            ) { }

  ngOnInit(): void {
    let year = getYear(new Date());
    let month = getMonth(new Date()) + 1;
    let todayDay = getDate(new Date());
    let endMonthValidationDt = year+","+month+","+todayDay; 
    this.setMaxDate =new Date(endMonthValidationDt);
    this.getCOVDetails()
  }
  getCOVDetails(){
      let subCOVBuyback =  this.benifitService.getCOVBuyback(this.overviewObject).subscribe(
         (data:DetailsCOV) => {
           this.cOVDetails = data;
           this.addCOVform(this.cOVDetails);
         },(err)=>{
          console.log(err);
         }
        );
    }
  addCOVform(cOVDetails){
    
    this.addCOVBuyback = new FormGroup({
      
      requestNumber: new FormControl({value:cOVDetails.requestNumber,disabled:this.viewMode}),
      vehicleNumber: new FormControl({value:cOVDetails.vehicleNumber,disabled:this.viewMode}),
      checkNumber: new FormControl("", [Validators.required]),
      checkDate: new FormControl("", [Validators.required]),
      bankName: new FormControl("", [Validators.required]),
      vehicleCost: new FormControl({value:cOVDetails.vehicleCost,disabled:this.viewMode}),
      noOfMonths: new FormControl({value:cOVDetails.noOfMonths,disabled:this.viewMode}),
      vehicleEmi: new FormControl({value:cOVDetails.vehicleEmi,disabled:this.viewMode}),
      insuranceEmi: new FormControl({value:cOVDetails.insuranceEmi,disabled:this.viewMode}),
      wdvit: new FormControl({value:cOVDetails.wdvit,disabled:this.viewMode}), //WDVT as per income tax
      bbAmount: new FormControl({value:cOVDetails.bbAmount,disabled:this.viewMode}), //wdv as per ctc
      perquisite: new FormControl({value:cOVDetails.perquisite,disabled:this.viewMode}),
      gstElgAmt: new FormControl({value:cOVDetails.gstElgAmt,disabled:this.viewMode}),
      cgstAmount: new FormControl({value:cOVDetails.cgstAmount,disabled:this.viewMode}),
      cgstPercent: new FormControl({value:cOVDetails.cgstPercent,disabled:this.viewMode}),

      sgstAmount: new FormControl({value:cOVDetails.sgstAmount,disabled:this.viewMode}),
      sgstPercent: new FormControl({value:cOVDetails.sgstPercent,disabled:this.viewMode}),

      cessAmount: new FormControl({value:cOVDetails.cessAmount,disabled:this.viewMode}),
      cessPercent: new FormControl({value:cOVDetails.cessPercent,disabled:this.viewMode}),

      totalTaxAmt: new FormControl({value:cOVDetails.totalTaxAmt,disabled:this.viewMode}),
      discountAmt: new FormControl({value:cOVDetails.discountAmt,disabled:this.viewMode}),
      discountPer: new FormControl({value:cOVDetails.discountPer,disabled:this.viewMode}),

      totalNet: new FormControl({value:cOVDetails.totalNet,disabled:this.viewMode}),
      tcsAmount: new FormControl({value:cOVDetails.tcsAmount,disabled:this.viewMode}),
      tcsPerAmount: new FormControl({value:cOVDetails.tcsPerAmount,disabled:this.viewMode}),
      vatTax: new FormControl({value:cOVDetails.vatTax,disabled:this.viewMode}),
      totalCheqAmt: new FormControl({value:cOVDetails.totalCheqAmt,disabled:this.viewMode}),
    });
  }
  
  numericOnly(event) {
    let numericVal = this.benifitService.spacevalidation(event);
    if (numericVal) {
      let inputVal = event.target.value.slice(1, -1);
      this.addCOVBuyback.get(event.target.name).patchValue(inputVal);
    } else {
      if(this.benifitService.setNumeric(event.target.value)){
        let inputVal = event.target.value.slice(0, -1);
        this.addCOVBuyback.get(event.target.name).patchValue(inputVal);
      }
    }
  }

  alphaNumericOnly(event){
    let alphaNumericVal = this.benifitService.spacevalidation(event);
      if (alphaNumericVal) {
        let inputVal = event.target.value.slice(1, -1);
        this.addCOVBuyback.get(event.target.name).patchValue(inputVal);
      } else {
        if(this.benifitService.setAlphaNumeric(event.target.value,true)){
          let inputVal = event.target.value.slice(0, -1);
          this.addCOVBuyback.get(event.target.name).patchValue(inputVal);
          
        }
      }
  }
  saveCOVBuyback(){
    console.log("value===>",this.addCOVBuyback.getRawValue());
    let payload = this.addCOVBuyback.getRawValue();
    let subCOVBuybackSave =  this.benifitService.saveCOVBuyback(payload).subscribe(
      (data:any) => {
        console.log("COVCreate",data);
        if(data.responseStatus=="SUCCESS"){
          let msgObj=  JSON.parse(data.responseData);
            this.messageService.showMessage(
              msgObj.d.Message,
              "Success",
              "success-icon",
              "CLOSE"
            );
            this.dialogRef.close('success');
          } else{
            this.messageService.showMessage(
              data.responseErrMsg,
              "Error",
              "warning-icon",
              "CLOSE"
            );
          }

        
      },(err)=>{
       console.log(err);
      }
     );
  }
  closeModal(){
    this.dialogRef.close();
  }
}
