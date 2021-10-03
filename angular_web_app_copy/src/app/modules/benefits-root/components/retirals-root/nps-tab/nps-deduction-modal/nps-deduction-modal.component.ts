import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NpsService } from '../nps.service';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-nps-deduction-modal',
  templateUrl: './nps-deduction-modal.component.html',
  styleUrls: ['./nps-deduction-modal.component.css']
})
export class NpsDeductionModalComponent implements OnInit ,OnDestroy {
  public subscriptionsList: Subscription[] = [];
  confirmationMsg: string; 
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private npsService:NpsService,
  private messageService:MessageModalService,
  public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    setTimeout(()=> {if(this.data.data.amount) this.data.data.amount = ''})
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  amountChange(event) {
    var regex = /^[0-9.]*$/
    let amount = this.data.data.amount
    if (regex.test(event.key) == false) {
      console.log(" in false")
      return false
    } else {
      if (amount.length == 0 && event.key == ".") {
        return false
      } else if (amount.indexOf(".") != -1 &&
        event.key == ".") {
        // if there is . and present pressed is .
        return false
      } else if (amount.indexOf(".") != -1 && amount.split(".")[1].length >= 2) {
        // if there is already a .
        // then allow only 2 digits after that
        return false
      } else {
        return true
      }
    }
  }
SaveNPS(){
  const body={
    "amount":parseFloat(this.data.data.amount).toFixed(2)
  }
  this.subscriptionsList.push(this.npsService.editNPS(body).subscribe((data:any)=>{
    console.log(data)
    if (data.responseStatus == 'FAILED') {
      this.messageService.showMessage(
        data.systemErrMsg,
        'Error',
        'warning-icon',
        'CLOSE'
      );
    } else {
      this.messageService.showMessage(
        "Successfully Updated",
        'Success',
        'success-icon',
        'CLOSE'
      );
      this.dialogRef.close('success');
    }
        }))
}
}
