import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PfPensionService } from '../../pf-pension.service';
import { MyRetiralsService } from '../../my-retirals.service';
import { PfTransferStatePopupComponent } from '../pf-transfer-state-popup/pf-transfer-state-popup.component';
import * as moment from 'moment';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-create-pf-transfer-form',
  templateUrl: './create-pf-transfer-form.component.html',
  styleUrls: ['./create-pf-transfer-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePfTransferFormComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  public flag: any = 'C';
  public formData: any = {
    "companyCode": "",
    "pfpensionFlagIndicator": "",
    "transferType": "",
    "barCodeNumber": "",
    "inwardNumber": "",
    "prevEmpName": "",
    "empAddress1": "",
    "empAddress2": "",
    "empAddress3": "",
    "empAddress4": "",
    "pfStateCode": "",
    "pfRegionCode": "",
    "pfEstCode": "",
    "pfSubCode": "",
    "prevPfNumber": "",
    "pensionStateCode": "",
    "pensionRegionCode": "",
    "pensionEstCode": "",
    "pensionSubCode": "",
    "prevPensionNumber": "",
    "curPfNumber": "",
    "dateOfJoining": null,
    "dateOfLeaving": null,
    "pdfStream": "",
    "officeLoc": "",
    "curPensionNumber": "",
    "transferTypeText": "",
    "managedBy": "",
    "trustName": "",
    "isFlagPrint": false,
    "isFlagDelete": false
  }
  public managedByList: any=[];
  public today = moment().toDate()
  public maxDOJ: any;
  public minDOL: any;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreatePfTransferFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pfPensionService: PfPensionService,
    public myRetiralsService: MyRetiralsService,
    private messageService:MessageModalService
  ) { }
  
  ngOnInit(): void {
    this.getManagedByList()
    this.flag = this.data.flag
    if (this.flag == 'E' || this.flag == 'D') {
      this.getPfData(this.data.rowData)
    }

    this.dateCheck()
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


  openStatePopup(flag) {
    let selectedStateCode=''
    let selectedRegionCode=''
    if(flag == 'PF'){
      selectedStateCode= this.formData.pfStateCode
      selectedRegionCode = this.formData.pfRegionCode
    }else if(flag == 'Pension'){
      selectedStateCode = this.formData.pensionStateCode
      selectedRegionCode = this.formData.pensionRegionCode
    }
    const dialogRef = this.dialog.open(PfTransferStatePopupComponent, {
      width: '450px',
      data: {
        flag: flag,
        stateCode: selectedStateCode,
        regionCode: selectedRegionCode
      }
    })

    this.subscriptionsList.push(dialogRef.afterClosed().subscribe((res: any)=>{
      if(res){
        if(flag == 'PF'){
          this.formData.pfStateCode =  res.stateCode
          this.formData.pfRegionCode =  res.regionCode
        }else if(flag == 'Pension'){
          this.formData.pensionStateCode =  res.stateCode
          this.formData.pensionRegionCode =  res.regionCode
        }
      }
    }))
  }

  getPfData(data) {
    this.subscriptionsList.push(
      this.pfPensionService.getPfPensionView(data.companyCode,
        data.pfpensionFlagIndicator,
        data.transferType,
        data.barCodeNumber).subscribe(
          (data: any) => {
            console.log(" edit ", data)
            this.formData = data
            this.formData.dateOfJoining = this.formData.dateOfJoining ? moment(this.formData.dateOfJoining).toDate() : ''
            this.formData.dateOfLeaving = this.formData.dateOfLeaving ? moment(this.formData.dateOfLeaving).toDate() : ''
            this.dateCheck()
          }
        ))
  }

  getManagedByList(){
    this.managedByList =[]
    this.subscriptionsList.push(
      this.pfPensionService.getManagedList().subscribe(
          (data: any) => {
            if(data.length>0){
             this.managedByList= data.filter(v=> v.managedByKey)
            }
          }
        ))
  }


  dateCheck(){
    this.maxDOJ = this.formData.dateOfLeaving? this.formData.dateOfLeaving: this.today
    this.minDOL = this.formData.dateOfJoining?this.formData.dateOfJoining:null
  }

  createPayload(){
    // date validation
    let obj = Object.assign({},this.formData)
    let payload = {
      "createPrevEmpName": obj.prevEmpName,
      "createEmpAddress1":  obj.empAddress1,
      "createEmpAddress2": obj.empAddress2,
      "createEmpAddress3": obj.empAddress3,
      "createEmpAddress4": obj.empAddress4,
      "createPfStateCode": obj.pfStateCode,
      "createPfRegionCode": obj.pfRegionCode,
      "createPfEstCode": obj.pfEstCode,
      "createPfSubCode": obj.pfSubCode,
      "createPrevPfNumber": obj.prevPfNumber,
      "createPensionStateCode": obj.pensionStateCode,
      "createPensionRegionCode": obj.pensionRegionCode,
      "createPensionEstCode": obj.pensionEstCode,
      "createPensionSubCode": obj.pensionSubCode,
      "createPrevPensionNumber": obj.prevPensionNumber,
      "createDateOfJoining": obj.dateOfJoining,
      "createDateOfLeaving": obj.dateOfLeaving,
      "createOfficeLocation": obj.officeLoc,
      "createManagedBy": obj.managedBy,
      "createCompanyCode": obj.companyCode,
      "createTransferType": obj.transferType,
      "createBarCodeNumber": obj.barCodeNumber,
      "createPfpensionFlagIndicator": obj.pfpensionFlagIndicator
    }
    payload.createDateOfJoining = payload.createDateOfJoining ? payload.createDateOfJoining.valueOf() : ''
    payload.createDateOfLeaving = payload.createDateOfLeaving ? payload.createDateOfLeaving.valueOf() : ''
    this.saveData(payload)
  }

  saveData(payload){
    this.subscriptionsList.push(
      this.pfPensionService.savePfPensionData(payload,this.flag).subscribe(
        (data: any)=>{
          if (data.responseStatus == 'SUCCESS'){
            let msg=''
            if(this.flag=='C'){
             msg= 'Submitted Successfully'
            }else{
              msg= 'Updated Successfully'
            }
            this.messageService.showMessage(
              msg,
              'Success',
              'success-icon',
              'CLOSE'
            );
            this.dialogRef.close('success');
          }else {
            let errorMsg =data.systemErrMsg?data.systemErrMsg:''
            this.messageService.showMessage(
              errorMsg,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          }
      
        }
      )
    )
  }

}
