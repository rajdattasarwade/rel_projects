import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { GpaClaimService } from '../gpa-claim.service';

@Component({
  selector: 'app-gpa-claim-modal',
  templateUrl: './gpa-claim-modal.component.html',
  styleUrls: ['./gpa-claim-modal.component.css']
})
export class GpaClaimModalComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  public formData: any = {
    "injuryType": "",
    "accidentPlace": "",
    "accidentTime": null,
    "accidentDate": null
  }
  public today = moment().toDate()
  
  constructor(private gpaClaimService: GpaClaimService,
              private messageService:MessageModalService,
              public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  saveClaimInitmation(){
    let payload = Object.assign({},this.formData)

    payload.accidentDate = payload.accidentDate.valueOf()   

    let date =new Date()
    date.setUTCHours(
      payload.accidentTime.split(":")[0],
      payload.accidentTime.split(":")[1],
      0,
      0)

    payload.accidentTime = date.getTime()
    

    this.subscriptionsList.push(
      this.gpaClaimService.saveClaimInitimation(payload).subscribe(
        (data: any)=>{
          if (data.responseStatus == 'FAILED') {
            this.messageService.showMessage(
              data.systemErrMsg,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          } else {
            let msg = 'Created Successfully'
            if(data.responseData){
              msg = JSON.parse(data.responseData).message?JSON.parse(data.responseData).message:msg
            }
            this.messageService.showMessage(
              msg,
              'Success',
              'success-icon',
              'CLOSE'
            );
            this.dialogRef.close('success')
          }
        }
      )
    )
  }

}
