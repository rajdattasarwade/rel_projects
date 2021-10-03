import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { SuperannuationService } from '../superannuation.service';

@Component({
  selector: 'app-super-create-deduction-modal',
  templateUrl: './super-create-deduction-modal.component.html',
  styleUrls: ['./super-create-deduction-modal.component.css']
})
export class SuperCreateDeductionModalComponent implements OnInit {

  public subscriptionList: Subscription[] = [];
  public formData: any = {};

  constructor(private supperannuationService: SuperannuationService,
    private messageService: MessageModalService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.formData = this.data
    this.formData.deductionFromDate = this.formData.deductionFromDate?moment(this.formData.deductionFromDate).format("DD/MM/YYYY"):null
    this.formData.deductionToDate = this.formData.deductionToDate?moment(this.formData.deductionToDate).format("DD/MM/YYYY"):null
    this.formData.deductionAmount = ''
  }

  ngOnDestroy() {
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach(element => {
        element.unsubscribe()
      })
    }
  }


  amountChange(event) {
    var regex = /^[0-9.]*$/
    if (regex.test(event.key) == false) {
      return false
    } else {
      if (this.formData.deductionAmount.indexOf(".") != -1 && event.key == ".") {
        // if there is . and present pressed is .
        return false
      } else {
        return true
      }
    }

  }

  checkValidation(){
    if(this.formData.deductionAmount > this.formData.maxAmount || this.formData.deductionAmount < this.formData.minAmount){
      let errorMessage = 'You are eligble to opt for an amount between ₹'+this.formData.minAmount+' and  ₹'+this.formData.maxAmount
      this.messageService.showMessage(
        errorMessage,
        'Error',
        'warning-icon',
        'CLOSE'
      );
    }else{
      this.saveDeduction()
    }
  }

  saveDeduction() {
    let payload = {
      "deductionFromDate": moment(this.formData.deductionFromDate).valueOf(),
      "deductionToDate": moment(this.formData.deductionToDate).valueOf(),
      "deductionAmount": +this.formData.deductionAmount,
      "messageType": "",
      "message": ""
    }
    this.subscriptionList.push(
      this.supperannuationService.saveDeduction(payload).subscribe(
        (data: any) => {
          if (data.responseStatus == 'FAILED') {
            this.messageService.showMessage(
              data.systemErrMsg,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          } else {
            this.messageService.showMessage(
              'All changes made by you have been successfully saved',
              'Success',
              'success-icon',
              'CLOSE'
            );
            this.dialogRef.close('success');
          }
        }
      )
    )
  }

  closeModal(){
    this.dialogRef.close('');
  }


}
