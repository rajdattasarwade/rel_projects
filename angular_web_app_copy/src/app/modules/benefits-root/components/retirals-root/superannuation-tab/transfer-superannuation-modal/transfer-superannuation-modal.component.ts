import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { SuperannuationService } from '../superannuation.service';
import * as moment from 'moment';

@Component({
  selector: 'app-transfer-superannuation-modal',
  templateUrl: './transfer-superannuation-modal.component.html',
  styleUrls: ['./transfer-superannuation-modal.component.css']
})
export class TransferSuperannuationModalComponent implements OnInit {

  public formData: any =  {
    "trustId": "",
    "sequenceNo": "",
    "prevEmprName": "",
    "prevTrustName": "",
    "address1": "",
    "address2": "",
    "address3": "",
    "address4": "",
    "dateOfLeaving": null,
    "status": "",
    "amountRec": 0,
    "amountDate": null,
    "licCode": "",
    "inwardNo": "",
    "deleteFlag": false,
    "editFlag": false,
    "pdfStream": ""
  }
  public subscriptionList: Subscription[]=[];
  public today = new Date();
  public flag: any = 'C';

  constructor(private supperannuationService:SuperannuationService,
    private messageService: MessageModalService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.flag = this.data.flag
    if(this.flag == 'E' || this.flag == 'D'){

      this.getEditData(this.data.rowData.trustId, this.data.rowData.sequenceNo)
    }
  }

  getEditData(trustId, seqno){
    this.subscriptionList.push(
      this.supperannuationService.getDetail(trustId,seqno).subscribe(
        (data: any)=>{
          this.formData = data
          if (this.flag=='E'){
            this.formData.dateOfLeaving = data.dateOfLeaving?moment(data.dateOfLeaving).toDate():''
        }else{
          this.formData.dateOfLeaving = data.dateOfLeaving?moment(data.dateOfLeaving).format('DD/MM/YYYY'):''
        }

      }
      )
    )
  }

  ngOnDestroy() {
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  alphabetValidation(event){
    var regex = /^[a-zA-Z ]*$/
    if (regex.test(event.key) == false) {
      return false
    } else {
      return true
    }
  }

  licNumberValidation(event){
    var regex = /^[a-zA-Z0-9-]*$/
    if (regex.test(event.key) == false) {
      return false
    } else {
      return true
    }
  }

  createPayload(){
    let dateOfLeaving = this.formData.dateOfLeaving?moment(this.formData.dateOfLeaving,'dd/MM/yyyy').valueOf():''
    let payload = {
      "prevEmployerName": this.formData.prevEmprName,
      "prevTrustName": this.formData.prevTrustName,
      "address1": this.formData.address1,
      "address2": this.formData.address2,
      "address3": this.formData.address3,
      "address4": this.formData.address4,
      "licCode": this.formData.licCode,
      "dateOfLeaving": dateOfLeaving,
      "trustId": this.formData.trustId,
      "sequenceNo": this.formData.sequenceNo
    }
    if(this.flag == 'C'){
      this.createSuperannuationTransfer(payload)
    }else{
      this.editSuperannuationTransfer(payload)
    }
  }

  createSuperannuationTransfer(payload){
    this.subscriptionList.push(
      this.supperannuationService.createSuperTransfer(payload).subscribe(
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
              'Submitted Successfully',
              'Success',
              'success-icon',
              'CLOSE'
            );
            this.closeModal()
          }
        }
      )
    )
  }

  closeModal(){
    this.dialogRef.close()
  }

  editSuperannuationTransfer(payload){
    this.subscriptionList.push(
      this.supperannuationService.editSuperTransfer(payload).subscribe(
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
              'Updated Successfully',
              'Success',
              'success-icon',
              'CLOSE'
            );
            this.closeModal()
          }
        }
      )
    )
  }

}
