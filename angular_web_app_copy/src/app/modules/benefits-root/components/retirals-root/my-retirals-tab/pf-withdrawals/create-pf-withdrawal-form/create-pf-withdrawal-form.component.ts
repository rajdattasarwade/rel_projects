import { Component, OnInit, Inject, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { WithdrawalTermsPopupComponent } from './withdrawal-terms-popup/withdrawal-terms-popup.component';
import { WithdrawalService } from '../withdrawal.service';
import { Subscription } from 'rxjs';
import { WithdrawalModelDetails} from '../withdrawal.model'
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import * as moment from 'moment';

@Component({
  selector: 'app-create-pf-withdrawal-form',
  templateUrl: './create-pf-withdrawal-form.component.html',
  styleUrls: ['./create-pf-withdrawal-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePfWithdrawalFormComponent implements OnInit, OnDestroy {
  public subscriptionsList: Subscription[] = [];
  formTypes = []
  selectedForm 
  genericFormFlag: boolean = false;
  insuranceFormFlag: boolean = false;
  medicalFormFlag: boolean = false;
  marriageFormFlag: boolean = false
  termData=[]
  relationSet=[]
  accountType=[]
  accountDetail={}
  form:any
  formStatus:boolean=false
  editData
  constructor(
    public dialogRef: MatDialogRef<CreatePfWithdrawalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public withdrawalServices: WithdrawalService,
    private messageService:MessageModalService
  ) { }

  ngOnInit(): void {
    this.getWithdrawalForms()
    this.getWithdrawalTerm()
    this.getAccountType()
    this.getAccountdetail()
    this.getRelation()
    if(this.data.flag!='C'){
    this.getWithdrawalDetail()
    }
    this.subscriptionsList.push(this.withdrawalServices.formEmitter.subscribe((data:any)=>{
      console.log(data)
      this.form=data
      if(this.form.status=='VALID'){
        this.formStatus=true
      }
      else{
        this.formStatus=false
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
  closeModal() {
    this.dialogRef.close();
  }

  openWithdrawalTerms() {
    this.dialog.open(WithdrawalTermsPopupComponent, {
      width: '683px',
      data:this.termData
    });
  }
  getWithdrawalForms() {
    this.subscriptionsList.push(this.withdrawalServices.getWithdrawalTypes().subscribe((data: any) => {
      console.log(data)
      this.formTypes = data
      this.formTypes.splice(0,1)
    }))
  }
  formSelection(event) {
    
    if ( event == '001' || event == '002' || event == '003' || event == '004' || event == '005' || event == '006') {
      this.insuranceFormFlag = false;
      this.medicalFormFlag = false;
      this.marriageFormFlag = false;
      this.genericFormFlag = true

    }
    else if(event=='007' || event=='009'||event=='013'){
      this.insuranceFormFlag = false;      
      this.marriageFormFlag = false;
      this.genericFormFlag = false
      this.medicalFormFlag = true;
    }
    else if(event=='008' || event=='011'||event=='012'){
      this.insuranceFormFlag = false;     
      this.genericFormFlag = false
      this.medicalFormFlag = false;
      this.marriageFormFlag = true;
    }
    else if(event=='010'){       
      this.genericFormFlag = false
      this.medicalFormFlag = false;
      this.marriageFormFlag = false;
      this.insuranceFormFlag = true;    

    }
    else{
      this.genericFormFlag = false
      this.medicalFormFlag = false;
      this.marriageFormFlag = false;
      this.insuranceFormFlag = false; 
    }
    setTimeout(()=>{
      this.withdrawalServices.formSelected.emit(event)
      this.withdrawalServices.commonformData.emit([{
        relation:this.relationSet,
        accountType:this.accountType,
        accountDetail:this.accountDetail
      }])
    })
   
  }
 getWithdrawalTerm(){
   this.subscriptionsList.push(this.withdrawalServices.getWithdrawalTerm().subscribe((data:any)=>{
     console.log(data)
     this.termData=data
     
   }))
 }
getRelation(){
  this.subscriptionsList.push(this.withdrawalServices.getRelations().subscribe((data:any)=>{
    console.log(data)
this.relationSet=data
  }))
}
getAccountType(){
  this.subscriptionsList.push(this.withdrawalServices.getAccountType().subscribe((data:any)=>{
    this.accountType=data
  }))
}
getAccountdetail(){
  this.subscriptionsList.push(this.withdrawalServices.getAccountDetail().subscribe((data:any)=>{
    this.accountDetail=data
  }))
}
createForm(){
const payload=new WithdrawalModelDetails(this.form.value)
payload.withdrawalCode=this.selectedForm
if(this.data.flag=='C'){
payload.imMode='CW'
}
else{
  payload.imMode='EW'
}
payload.applyDate=moment(new Date).toDate().getTime()

console.log(payload)
this.subscriptionsList.push(this.withdrawalServices.saveWithdrawalForm(payload,this.data.flag).subscribe((data:any)=>{
  console.log(data)
  if (data.responseStatus == 'FAILED' || data.responseStatus=='ERROR') {
    var msg=''
    if(data.systemErrMsg){
      msg=data.systemErrMsg
    }
    else{
      msg=data.responseErrMsg
    }
    this.messageService.showMessage(
      msg,
      'Error',
      'warning-icon',
      'CLOSE'
    );
  } else {
    msg= 'Record Submitted Successfully'
    
    this.messageService.showMessage(
      msg,
      'Success',
      'success-icon',
      'CLOSE'
    );
    this.dialogRef.close('success');

  }
}))
}
getWithdrawalDetail(){
  console.log(this.data.rowData)
  this.subscriptionsList.push(this.withdrawalServices.getWithdrawalDetail(this.data.rowData).subscribe((data:any)=>{
    console.log(data)
    this.editData=data
    this.selectedForm=data.withdrawalCode
    this.formSelection(this.selectedForm)
    setTimeout(()=>{
      this.withdrawalServices.editDataEmitter.emit(
        {
          flag:this.data.flag,
        data:this.editData
      }
      )
    })
   

  }))
}
}
