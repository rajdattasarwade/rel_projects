import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import * as moment from 'moment';
import {
  AttachDoc,
  ReimbursementsDetails,
} from '../../../utils/reimbursements.model';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medical-reimbursement',
  templateUrl: './medical-reimbursement.component.html',
  styleUrls: ['./medical-reimbursement.component.css'],
})
export class MedicalReimbursementComponent implements OnInit {
  form: FormArray;
  childFormGroup: FormGroup;
  files: any[] = [];
  setMaxDate:any;
  validFile:boolean=false;
  @ViewChild("fileDropRef") fileDropRef;
  buttonText:string="ATTACH";
  claimDetails:any;
  sapCode:any;
  typetext:any;
  requestNumberNC:any;
  baseFormDetails:any;
  claimNumber:any;
  addedFormBills:any[] = [];
  attachdoc:any = [];
  statuskey:any
  disabled:boolean = false
  Createflag:boolean = true
  confirmationMsg: string; 
  attachedFiles: any[] = []; //files attached array
  isFileUploadedValid: boolean = false; // check if uploaded file valid or not
  attachObj = {
    // for response AttachObj(create/edit)
    attachDoc: null,
  };
  editClaimObj: ReimbursementsDetails[] = []; //primarily for edit
  setClaimDetailObj: any = []; //final payload for claimObj
  attachFiles: any = []; //array of files attached
  attachmentObj: AttachDoc = new AttachDoc([]);
  claimObj: ReimbursementsDetails = new ReimbursementsDetails(this.attachObj);
  lineNoToDelete: string[] = []; //store list of linenumbers to delete if full section is removed in case of edit
  addAttachmentKey: string = '';
  totalAmountDis: any;
  amount: any;
  balanceAmount: any;
  displayFiles: any[] = [];
  counter = 1;
  subscriptionList: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<any>,
    private reimbursmentService: ReimbursementsService,
    private messageService:MessageModalService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.form = new FormArray([]);
    this.setMaxDate = new Date();
    
    if(this.data.payLoad.setOperation=="Edit"){
      this.getClaimValue();
      var typeDetailPayLoadFromPopup = JSON.parse(
        JSON.stringify(this.data.payLoad.typeDetails)
      );
      //call claim details
      this.Createflag = false
      this.disabled=this.data.payLoad.viewMode
      console.log("Details===>",this.data);
      this.claimDetails = JSON.parse(JSON.stringify(this.data.payLoad.typeDetails));
      this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;
      this.typetext = this.data.payLoad.typeDetails.reimbursementTypeKey.value;
      this.statuskey=this.data.payLoad.typeDetails.statusKey 
      this.headerClaimDetails();
      this.reimbursmentService.getClaimBills(this.claimDetails.claimNumber).subscribe(
      (data: any) => {
        this.addedFormBills = data;
        this.editClaimObj = data;
        if(this.addedFormBills.length>0){
          this.claimNumber=this.addedFormBills[0].claimNumber;
          console.log( this.claimNumber)
           console.log(this.data)
          for(let editObj of  this.addedFormBills){
            this.form.push(this.editGroup(editObj));
            this.attachedFiles.push(editObj.attachDoc);
            if(editObj.attachDoc){
              let obj = {
                name: editObj.attachDoc.fileName,
                lineNumber: editObj.attachDoc.lineNumber
              }
              this.displayFiles.push([obj]);
            }else{
              this.displayFiles.push([]);
            }
          }
        }
      },
      (err)=>{
        console.log(err);
      }
    );
   
    } else {
      this.totalAmountDis = this.data.typeDetails.totalAmount;
      this.amount = this.data.typeDetails.amount;
      this.balanceAmount = this.data.typeDetails.balanceAmount;
      this.sapCode = this.data.typeDetails.reimbursementType.sapCode;
      this.typetext = this.data.typeDetails.reimbursementType.value;
      this.addForm();
   
  }

  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  headerClaimDetails(){
    this.reimbursmentService
        .getClaimHeader(this.claimDetails.claimNumber)
        .subscribe(
          data => {
            this.baseFormDetails = data[0];
            this.requestNumberNC = this.baseFormDetails.requestNumberNC;
          },(err)=>{
            console.log(err);
          } );  
}


editGroup(editObj) {
  let setEditAttach = '';
  if (editObj.attachDoc != 'undefined' && editObj.attachDoc != null) {
    setEditAttach = editObj.attachDoc.fileName;
  }
  let form = new FormGroup({
    billNo: new FormControl(editObj.billNumber, Validators.required),
    billDate: new FormControl(
      new Date(editObj.billDate),
      Validators.required
    ),
    billAmount: new FormControl(editObj.requestedAmount, Validators.required),
    remarks: new FormControl(editObj.remarks),
    attachment: new FormControl(setEditAttach),
    lineNo: new FormControl(editObj.lineNumber),
  });

  return form;
}

  deleteForm(index) {
    this.form.removeAt(index);
    this.files.splice(index, 1);
  }

  addForm() {
    if (this.editClaimObj.length > 0) {
       if (this.counter == 1) {
        let count = this.editClaimObj[this.editClaimObj.length - 1].lineNumber;
        let indexToStartFrom = count.substring(count.length - 1);
        this.counter = parseInt(indexToStartFrom) + 1;
        this.form.push(
          this.createGroup(this.counter)
        );
      } else {
        
        this.form.push(
          this.createGroup(this.counter)
        );
        this.counter++;
       }
    } else {
       
      this.form.push(this.createGroup(this.counter));
      this.counter++;
    }
    console.log(this.form)
  }

  createGroup(counter) {
    this.childFormGroup = new FormGroup({
      billNo: new FormControl("", Validators.required),
      billDate: new FormControl("", Validators.required),
      billAmount: new FormControl("", Validators.required),
      remarks: new FormControl(""),
      attachment: new FormControl(""),
      editAtach:new FormControl(""),
       hasAttached:new FormControl(false),
       lineNo: new FormControl('000' + counter),
    });

    return this.childFormGroup;
  }



  onCancel(): void {
    this.dialogRef.close();
  }

  deleteMedicalForm(index) {
    let lineNumber = '';
    lineNumber = this.form.controls[index]['controls'].lineNo.value;
    // }
    this.form.removeAt(index);
    this.attachedFiles.splice(index, 1);
    this.lineNoToDelete.push(lineNumber);
    this.createPayLoad(index, 'deleteRow');
  }

  medicalFormSaveSubmitConfirmation(actionOpr) {
    let isDuplicateValPresent = this.checkIfDuplicateEntryPresent();
    if (!isDuplicateValPresent) {
      if (actionOpr == 'draft') {
        this.statuskey = 'N';
        this.confirmationMsg = 'Do you want to Save as Draft?';
      } else {
        this.statuskey = 'T';
        this.confirmationMsg =
          'Ensure all supporting documents are attached. Do you want to save?';
      }
      this.messageService.showConfirmation(
        this.confirmationMsg,
        'Confirmation',
        'confirmation-icon',
        (reason) => {
          if (reason === 'YES') {
            this.createPayLoad('', 'create');
          }
        }
      );
    } else {
    }
  }

  checkIfDuplicateEntryPresent() {
    let lineNoForDuplicateVal = this.reimbursmentService.checkDuplicateRowVal(
      this.form.value
    );
    if (lineNoForDuplicateVal.length > 0) {
      this.confirmationMsg =
        'Entries at ' + lineNoForDuplicateVal.join() + ' should not be same';
      this.messageService.showMessage(
        this.confirmationMsg,
        'Error',
        'warning-icon',
        'CLOSE'
      );
      return true;
    } else {
      return false;
    }
  }
  
  onFileDropped($event,i) {
    this.prepareFilesList($event,i);
  }

  fileBrowseHandler(files, i) {
    this.prepareFilesList(files, i);
  }
 
  prepareFilesList(files: Array<any>, index) {
    if (files.length > 0) {
      let isFileSizeValid = false;
      let isFileTypeValid = false;
      isFileSizeValid = this.reimbursmentService.isFileSizeValid(files[0]);
      isFileTypeValid = this.reimbursmentService.isFileTypeValid(files[0]);
      if (isFileSizeValid && isFileTypeValid) {
        if (index !== -1 && this.attachedFiles.length > index) {
          this.attachedFiles[index] = files[0];
        } else {
          this.attachedFiles.push(files[0]);
        }

        this.form.controls[index]['controls'].attachment.value =
          files[0].name;
        this.isFileUploadedValid = false;
      } else {
        this.form.controls[index]['controls'].attachment.value = '';
        this.isFileUploadedValid = true;
      }
      this.createPayLoad(index, 'addAttachment');
    }
  }

  createPayLoad(index, opr) {
    let totalAmt = 0; //total Amt of all claim
    this.setClaimDetailObj = [];
    if (opr == 'addAttachment') {
      this.addAttachmentFuctionality(index, totalAmt, opr);
    } else if (opr == 'deleteAttachment') {
      this.deleteAttachmentFunctionality(index, opr);
    } else if (opr == 'deleteRow') {
      this.deleteRow(index, opr);
    } else if (opr == 'create') {
      this.createAndEdit(totalAmt, opr);
    }
  }

   addAttachmentFuctionality(index, totalAmt, opr) {
    this.addAttachmentKey = 'A';
    let lineNumber = this.form.controls[index]['controls'].lineNo
      .value;
    this.claimObj.lineNumber = lineNumber;
    totalAmt =
      totalAmt +
      parseInt(
        this.form.controls[index]['controls'].billAmount.value
      );
    this.claimObj.attachDoc = null; //case of cremedicalObjate
    this.claimObj.billNumber = this.form.controls[index][
      'controls'
    ].billNo.value;
    this.claimObj.billDate = new Date(
      this.form.controls[index]['controls'].billDate.value
    ).getTime();
    this.claimObj.billAmount = this.form.controls[index][
      'controls'
    ].billAmount.value;
    this.claimObj.remarks = this.form.controls[index][
      'controls'
    ].remarks.value;
    this.claimObj.requestedAmount = this.form.controls[index][
      'controls'
    ].billAmount.value;
  
    this.claimObj.claimNumber = this.claimNumber
      ? this.claimNumber
      : this.addAttachmentKey == 'A'
      ? ' '
      : '';
     this.claimObj.reimbursementType = this.sapCode
    let claimDetailObj = JSON.parse(JSON.stringify(this.claimObj));
    this.setClaimDetailObj.push(claimDetailObj);
    console.log(this.setClaimDetailObj);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);
    this.hitOperationApi(index, finalPayLoad, opr);
  }

  deleteAttachmentFunctionality(index, opr) {
    this.attachmentObj.fileName = this.attachedFiles[index].name;
    // this.attachmentObj.fileName = this.filename;
    this.attachmentObj.reimbursementType = this.sapCode;
    this.attachmentObj.fileType = '.pdf';
    this.attachmentObj.deleteFlag = false;
    
    this.attachmentObj.lineNumber = this.form.controls[index][
      'controls'
    ].lineNo.value;
    this.attachmentObj.claimNumber = this.claimNumber;
    let claimDetailObj = JSON.parse(JSON.stringify(this.attachmentObj));
    this.hitOperationApi(index, claimDetailObj, opr);
  }

  deleteRow(index, opr) {
    this.setClaimDetailObj = null;
    console.log(this.setClaimDetailObj);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);
    console.log('in delete fun');
    console.log(opr);
    this.hitOperationApi(index, finalPayLoad, opr);
  }

  createAndEdit(totalAmt, opr) {
    let lineNumber = '';
    for (let [index, medicalObj] of this.form.value.entries()) {
      totalAmt = totalAmt + parseInt(medicalObj.billAmount);
      this.claimObj.attachDoc = null; //case of create
      this.claimObj.billNumber = medicalObj.billNo;
      this.claimObj.billDate = new Date(medicalObj.billDate).getTime();
      this.claimObj.billAmount = medicalObj.billAmount;
      this.claimObj.remarks = medicalObj.remarks;
      this.claimObj.requestedAmount = medicalObj.billAmount;
      this.claimObj.claimNumber = this.claimNumber
      ? this.claimNumber
      : this.addAttachmentKey == 'A'
      ? ' '
      : '';
      this.claimObj.lineNumber = medicalObj.lineNo;
      // }

      let claimDetailObj = JSON.parse(JSON.stringify(this.claimObj));
      this.setClaimDetailObj.push(claimDetailObj);
      console.log(this.setClaimDetailObj);
    }
    var finalPayLoad = this.createFinalPayLoad(
      this.setClaimDetailObj,
      totalAmt
    );
    this.addAttachmentKey = '';
    this.hitOperationApi(0, finalPayLoad, opr);
  }

  createFinalPayLoad(obj, totalAmt) {
    var payload = {
      claimDetail: obj,
      reimbursementType: this.sapCode,
      totalAmount: totalAmt != 0 ? totalAmt : 0,
      requestOperation: this.data.payLoad.setOperation == 'Edit' ? 'EE' : 'EC',
      deletedLineNumber: this.lineNoToDelete,
      claimNumber: this.claimNumber
      ? this.claimNumber
      : this.addAttachmentKey == 'A'
      ? ' '
      : '',
      reimbursementStatus: this.statuskey
        ? this.statuskey
        : '',
      requestNumberNC: '',
    };
    console.log(payload);
    return payload;
  }

  hitOperationApi(index, payload, opr) {
    console.log(opr);
    if (opr == 'addAttachment') {
      this.reimbursmentService
        .addAttachment(payload, this.attachedFiles[index])
        .subscribe(
          (data: any) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (opr == 'deleteAttachment') {
     
      this.reimbursmentService.deleteAttachment(payload).subscribe(
        (data: any) => {
          console.log(data);
          this.form.controls[index]['controls'].attachment.value =
          '';
        this.attachedFiles[index] = null;
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (opr == 'deleteRow') {
      this.reimbursmentService.deleteRows(payload).subscribe(
        (data: any) => {
          console.log(data);
          this.lineNoToDelete = [];
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (opr == 'create') {
      this.reimbursmentService.createClaim(payload).subscribe((data: any) => {
        console.log(data);
        if (data.responseStatus == 'FAILED') {
          this.messageService.showMessage(
            data.systemErrMsg,
            'Error',
            'warning-icon',
            'CLOSE'
          );
        } else {
          let msg = JSON.parse(data.responseData)
          this.messageService.showMessage(
            msg.message,
            'Success',
            'success-icon',
            'CLOSE'
          );
          this.dialogRef.close('success');
        }
      });
    } else {
      //do nothimg
    }
  }

  deleteAttachmentFile(index: number) {
    // this.confirmAttachmentDelete(index);
    this.createPayLoad(index, 'deleteAttachment');
  }

  confirmAttachmentDelete(index) {
    this.messageService.showConfirmation(
      'Are you sure you want to delete the selected file?.',
      'Confirmation',
      'confirmation-icon',
      (reason) => {
        if (reason === 'YES') {
         
          this.createPayLoad(index, 'deleteAttachment');
        }
      }
    );
  }

  openPdf(data: any, index: number): void {
    let name = '';    
    if(data.imageUrlClicked){
      name = data.fileClicked.name.split('.')[0];
      this.onViewPdf(data.fileClicked, name);
    } else {
      name = this.attachedFiles[index] ? this.attachedFiles[index].fileName.split('.')[0]: '';
     let obj = {
      sapCode: this.attachedFiles[index].reimbursementType,
      claimNo: this.attachedFiles[index].claimNumber,
      lineNo: this.attachedFiles[index].lineNumber 
     };
     this.subscriptionList.push(
      this.reimbursmentService.openAttachment(obj).subscribe((data: any) => {
        if(data){
           this.onViewPdf(data, name); 
        }
      }, error => {
        console.log(error);
      })
     );
    }
  }
  onViewPdf(data: any, name: string): void {
    let file = new Blob([data],{type: 'application/pdf'});
    let pdfUrl = URL.createObjectURL(file);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = pdfUrl;
    dialogRef.componentInstance.title = name;
    dialogRef.componentInstance.pdfName = name;
  }
 
  validate(){
    let error=false
    for(let i=0;i< this.form.value.length;i++){
      let formValObj=this.form.value[i]
      let dtateToTimestamp = this.form.value[i].billDate.toDate().getTime();
      let sameindex=this.form.value.findIndex((element,index)=>{
        let timestamp = element.billDate.toDate().getTime()
        return (i!=index)&&(dtateToTimestamp==timestamp && formValObj.billNo==element.billNo &&
          formValObj.billAmount==element.billAmount )
      })
      if (sameindex>-1){
        console.log(sameindex,i)
        this.messageService.showMessage(
          "Entries at line number " +(i+1)+ " and " +(sameindex+1)+ " should not be same",
          "Error",
          "warning-icon",
          "CLOSE"
        );
        error=true
        break
      }
      console.log(sameindex,i)
    }
    return error
  }

  getClaimValue() {
    this.reimbursmentService.getEligibility().subscribe(
      (data) => {
        if (data.length > 0) {
          for (let item of data) {
            if (item.reimbursementType.sapCode == this.sapCode) {
              this.totalAmountDis = item.totalAmount;
              this.amount = item.amount;
              this.balanceAmount = item.balanceAmount;
              //  this.fuelexpTypeDetails = item;
            }
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
