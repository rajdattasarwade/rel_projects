import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GpaClaimService } from '../gpa-claim.service';
import * as moment from 'moment';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-coverage-claims-modal',
  templateUrl: './coverage-claims-modal.component.html',
  styleUrls: ['./coverage-claims-modal.component.css']
})
export class CoverageClaimsModalComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  public formData: any = {
    "claimNumber": "",
    "leaveFrom": null,
    "leaveTo": null,
    "claimAmount": 0,
    "disabilityDescription": "",
    "accidentDetail": "",
    "dischargedDate": null,
    "hospitalizedFrom": null,
    "hospitalAddress": "",
    "personalPolicy": false,
    "policeStationAddress": "",
    "policyNumber": "",
    "reportedToPolice": false,
    "takenToHospital": false,
    "treatmentDetail": "",
    "disabilityType": "",
    "accidentDate": null,
    "accidentTime": null,
    "accidentPlace": "",
    "injuryType": ""
}

public generalDropDownList = [
  { value: true, text: 'Yes' },
  { value: false, text: 'No' }
]

public disablitiyDropdown = [
  { value: "1", text: 'Partial Disability' },
  { value: "2", text: 'Permanent Disability' }
]
public today = moment().toDate()
minLeaveTo: any;
minDischargeDate: any;


  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<any>,
              private messageService:MessageModalService,
              private gpaClaimService: GpaClaimService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    let claimNo = this.data.claimNo
    this.editGetClaim(claimNo)
  }

  ngOnDestroy(){
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  
  editGetClaim(claimNo){
    this.subscriptionsList.push(
      this.gpaClaimService.getEditClaim(claimNo).subscribe(
        (data)=>{
          this.formData = Object.assign({},data)
          this.formData.accidentDate = this.formData.accidentDate? moment(this.formData.accidentDate).toDate(): null
          this.formData.dischargedDate = this.formData.dischargedDate? moment(this.formData.dischargedDate).toDate(): null
          this.formData.hospitalizedFrom = this.formData.hospitalizedFrom? moment(this.formData.hospitalizedFrom).toDate(): null
          this.formData.leaveFrom = this.formData.leaveFrom? moment(this.formData.leaveFrom).toDate(): null
          this.formData.leaveTo = this.formData.leaveTo? moment(this.formData.leaveTo).toDate(): null
          this.formData.accidentTime = this.formData.accidentTime? moment(this.formData.accidentTime).utc().format('HH:mm'): null

          this.setMinLeaveTo()
          this.setMinDischargeDate()
        }
      )
    )
  }

  setMinLeaveTo(){
    if(this.formData.leaveFrom){
      this.minLeaveTo = this.formData.leaveFrom
    }else {
      this.minLeaveTo = this.formData.accidentDate
    }
  }

  setMinDischargeDate(){
    if(this.formData.adminssionDate){
      this.minDischargeDate = this.formData.adminssionDate
    }else {
      this.minDischargeDate = this.formData.accidentDate
    }
  }
  closeModal() {
    this.dialogRef.close();
  }

  decimalNumberValidation(event){
    var regex = /^[0-9.]*$/
    if (regex.test(event.key) == false) {
      return false
    } else {
      return true
    }
  }

  updateClaim() {
    let payload = Object.assign({}, this.formData)

    let accDate = moment(payload.accidentDate)
    payload.accidentDate = payload.accidentDate ? moment(payload.accidentDate).valueOf() : null
    payload.dischargedDate = payload.dischargedDate ? moment(payload.dischargedDate).valueOf() : null
    payload.leaveFrom = payload.leaveFrom ? moment(payload.leaveFrom).valueOf() : null
    payload.leaveTo = payload.leaveTo ? moment(payload.leaveTo).valueOf() : null

    accDate.set("hour", payload.accidentTime.split(":")[0])
    .set("minute", payload.accidentTime.split(":")[1])
    .set("second", 0)

    payload.accidentTime = accDate.valueOf()


    this.subscriptionsList.push(
      this.gpaClaimService.updateClaim(payload).subscribe(
        (data: any)=>{
          if (data.responseStatus == 'FAILED') {
            this.messageService.showMessage(
              data.systemErrMsg,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          } else {
            let msg = 'Updated Successfully'
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
