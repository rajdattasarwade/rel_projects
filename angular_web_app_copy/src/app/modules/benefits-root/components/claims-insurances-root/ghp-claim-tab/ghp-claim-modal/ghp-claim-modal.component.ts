import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GhpClaimService } from '../ghp-claim.service';
import * as moment from 'moment';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-ghp-claim-modal',
  templateUrl: './ghp-claim-modal.component.html',
  styleUrls: ['./ghp-claim-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GhpClaimModalComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  dependantsList: any = [];
  public formData: any = {
    "claimNumber": "",
    "familyMemberName": {
      "memberName": "",
      "relation": null,
      "relationId": "",
      "balanceAmount": null
    },
    "tpaId": "",
    "balance": null,
    "hospitalizedFromDate": null,
    "dischargedOnDate": null,
    "natureOfillness": "",
    "hospital": {
      "hospitalName": "",
      "hospitalRegNo": "",
      "hospitalAddress": ""
    },
    "expense": {
      "duringHospitalization": null,
      "postHospitalExpense": null,
      "preHospitalExpense": null,
      "advancePaid": null,
      "advancePaidDate": null
    },
    "total": null,
    "enclosedDocs": [],
    "remark": "",
    "claimStatus": null,
    "otherDoc": "",
    "actionType": null
  }

  public docsArray = [[],[],[],[]]
  public today = moment().toDate()
  maxAdvanceDate: any;
  // [
  //   [
  //     { name: 'Discharge Card', checked: false },
  //     { name: 'Diagnostic Report', checked: false },
  //     { name: 'Chemist Bill', checked: false }
  //   ],
  //   [
  //     { name: 'Dental Eye OPD', checked: false },
  //     { name: 'Hospital Bills', checked: false },
  //     { name: 'Room Tariff', checked: false }
  //   ],
  //   [
  //     { name: 'Indoor case Papers', checked: false },
  //     { name: 'C Form', checked: false },
  //     { name: 'Stamped Receipts', checked: false }
  //   ],
  //   [
  //     { name: 'Stamped Bills', checked: false },
  //     { name: 'Prescription', checked: false },
  //     { name: '', checked: false }
  //   ]
  // ]


  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ghpClaimService: GhpClaimService,
    private messageService:MessageModalService) { }

  ngOnInit(): void {
    this.maxAdvanceDate = this.today
    this.getDependants()
    this.getEnclosingDocs()   
  }

  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }
  closeModal() {
    this.dialogRef.close();
  }

  getDependants() {
    this.subscriptionsList.push(
      this.ghpClaimService.getDependants().subscribe(
        (data: any) => {
          this.dependantsList = data
        }
      )
    )
  }

  getEnclosingDocs(){
    this.subscriptionsList.push(
      this.ghpClaimService.getEnclosingDocsList().subscribe(
        (data: any)=>{
          if(data.length > 0){
            data.forEach((element,i)=>{
              const obj = { name: element.replace('_',' '), value: element, checked: false }
              if(i >= 0 && i <= 2){
                this.docsArray[0].push(obj)
              }else if(i > 2 && i <= 5){
                this.docsArray[1].push(obj)
              }else if(i > 5 && i <= 8){
                this.docsArray[2].push(obj)
              }else {
                this.docsArray[3].push(obj)
              }
            })
          }           
          if (this.data.flag != 'C') {
            this.getEditGhpClaim()
          }

        },
        (error: any)=>{           
          if (this.data.flag != 'C') {
            this.getEditGhpClaim()
          }
        }
      )
    )
  }

  getEditGhpClaim() {
    this.subscriptionsList.push(
      this.ghpClaimService.getDisplayData(this.data.element.claimNumber).subscribe(
        (data: any) => {
          this.formData = data
          this.docsArray.forEach(element =>{
            element.forEach(docs =>{
              docs.checked = this.formData.enclosedDocs.filter(v =>v.toLowerCase() == docs.value.toLowerCase()).length > 0?true:false
            })
          })

          this.formData.hospitalizedFromDate = this.formData.hospitalizedFromDate? moment(this.formData.hospitalizedFromDate).toDate():null
          this.formData.dischargedOnDate = this.formData.dischargedOnDate? moment(this.formData.dischargedOnDate).toDate():null
          this.formData.expense.advancePaidDate = this.formData.expense.advancePaidDate? moment(this.formData.expense.advancePaidDate).toDate():null
          this.advanceDateCheck()
        }
      )
    )
  }

  decimalNumberValidation(event){
    var regex = /^[0-9.]*$/
    if (regex.test(event.key) == false) {
      return false
    } else {
      return true
    }
  }


  changeFamilyMember(data){
    this.formData.familyMemberName = Object.assign({}, data)
    this.formData.balance = data.balanceAmount
  }

  changeDocsList(docs,event){
    if(event.checked){
      this.formData.enclosedDocs.push(docs.value)
    }else{
      let index = this.formData.enclosedDocs.findIndex(v => v == docs.value)
      if(index > -1){
        this.formData.enclosedDocs.splice(index,1)
      }
    }
  }

  advanceDateCheck() {
    // hospitalizationdate < today
    // discharge date <today or dischargedate > hospitaldate
    // advance date < hospital date or advancedate < today
    this.maxAdvanceDate = this.formData.hospitalizedFromDate ? this.formData.hospitalizedFromDate : this.today
    if (this.formData.expense.advancePaidDate) {
      if (this.formData.expense.advancePaidDate.getTime() > this.maxAdvanceDate.getTime()) {
        this.formData.expense.advancePaidDate = null
      }
    }
  }
  totalCalculation(){
    let dhAmount = 0
    if(this.formData.expense.duringHospitalization){
      dhAmount = parseInt(this.formData.expense.duringHospitalization)
    }

    let postHAmount = 0
    if(this.formData.expense.postHospitalExpense){
      postHAmount = parseInt(this.formData.expense.postHospitalExpense)
    }

    let preHAmount = 0
    if(this.formData.expense.preHospitalExpense){
      preHAmount = parseInt(this.formData.expense.preHospitalExpense)
    }
    this.formData.total = dhAmount + postHAmount + preHAmount
  }

  saveClaim(){
    let payload = JSON.parse(JSON.stringify(this.formData))
    payload.hospitalizedFromDate = payload.hospitalizedFromDate? moment(payload.hospitalizedFromDate).valueOf():null
    payload.dischargedOnDate = payload.dischargedOnDate? moment(payload.dischargedOnDate).valueOf():null
    payload.expense.advancePaidDate = payload.expense.advancePaidDate? moment(payload.expense.advancePaidDate).valueOf():null

    payload.actionType = this.data.flag =='C'?'CREATE':'UPDATE'
    const endpoint = this.data.flag == 'C'?'save':'update'
    this.subscriptionsList.push(
      this.ghpClaimService.saveClaim(payload, endpoint).subscribe(
        (data: any)=>{
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
        }
      )
    )
  }
}
