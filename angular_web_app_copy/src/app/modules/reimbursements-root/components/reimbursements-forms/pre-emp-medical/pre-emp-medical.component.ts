import { Component, OnInit, ViewEncapsulation, Input,Inject, ElementRef,ViewChild } from '@angular/core';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormArray, FormBuilder,FormControl, Validators } from '@angular/forms';
import { getYear,getMonth,getDaysInMonth,getDate }  from 'date-fns';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { ReimbursementsDetails, ReimbursementsTypeDetails,AttachDoc } from '../../../utils/reimbursements.model';
import { Subscription } from '../../../../../../../node_modules/rxjs';
import { PdfViewerModalComponent } from '../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';


@Component({
  selector: 'app-pre-emp-medical',
  templateUrl: './pre-emp-medical.component.html',
  styleUrls: ['./pre-emp-medical.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PreEmpMedicalComponent implements OnInit {
  pMFieldForm:FormArray;
  parentValue:any;
   obj = {
    attachDoc:null
  }
  payload:any;
  pMbillDetails:ReimbursementsDetails=new ReimbursementsDetails(this.obj);
  billDetailsData:ReimbursementsDetails[]=[] ;
  attachmentGTObj: AttachDoc = new AttachDoc([]);
  @Input() public typeDetails;
  tempDeleteForm:string[]=[];
  claimDetails:any;
  sapCode:any;
  typetext:any;
  setClaimDetail:any=[];
  buttonText:string="ATTACH";
  attachFiles: any[]= [];
  draft:string="draft";
  submit:string="submit";
  validFile:boolean=false;
  addedFormBills:any[] = [];
  requestNumberNC:any;
  baseFormDetails:any;
  claimNumber:any;
  lineNumberDupli:any=[];
  //reimburseStatusKey:any;
  pMFormGroup:FormGroup;
  guestCallback: () => {};
  setMaxDate:any;
  @ViewChild("fileDropRef") fileDropRef;
  counter=1;
  lineNoToDelete: string[] = []; 
  reimbursementStatusKey: string = '';
  addAttachmentKey: string = '';
  statusText: boolean = false;
  subscriptionList: Subscription[] = [];
  displayFiles: any[] = [];
 constructor(
    private reimbursmentService: ReimbursementsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private messageService:MessageModalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
      console.log('In guest travel');
    this.tempDeleteForm =[];
    let year = getYear(new Date());
    let month = getMonth(new Date()) + 1;
    let todayDay = getDate(new Date());
    let endMonthValidationDt = year+","+month+","+todayDay; 
    this.setMaxDate =new Date(endMonthValidationDt);
    this.pMFieldForm=new FormArray([]);
    
    if(this.data.payLoad.setOperation=="Edit"){
      //call claim details
      this.claimDetails = JSON.parse(JSON.stringify(this.data.payLoad.typeDetails));
      if (this.data.payLoad.typeDetails.statusText.includes('Saved')) {
        this.statusText = true;
      } else {
        this.statusText = false;
      }
      this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;
      this.typetext = this.data.payLoad.typeDetails.reimbursementTypeKey.value;
      this.headerClaimDetails();
      this.reimbursmentService.getClaimBills(this.claimDetails.claimNumber).subscribe(
      (data: ReimbursementsDetails[]) => {
        //billDetails  
        this.billDetailsData = data;
        if(this.billDetailsData.length){
          this.claimNumber=this.billDetailsData[0].claimNumber;
          for(let editObj of this.billDetailsData){
            this.attachFiles.push(editObj.attachDoc);
            this.pMFieldForm.push(this.editGroup(editObj));
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
      this.statusText = false;
      this.sapCode = this.data.typeDetails.reimbursementType.sapCode;
      this.typetext = this.data.typeDetails.reimbursementType.value;
      this.addForm();
    }
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

  createGroup(counter)
  {
     this.pMFormGroup= new FormGroup({
      traRequestNo:new FormControl(""),
      billNo:new FormControl("",Validators.required),
      billDate:new FormControl("",Validators.required),
      requestedAmt:new FormControl("",Validators.required), 
      remarks:new FormControl(""),
      attachment:new FormControl(""),
      lineNo: new FormControl('000' + counter),
    });

    return this.pMFormGroup;
  }

  addForm() {
    if(this.billDetailsData.length>0){
      if (this.counter == 1) {
        let count = this.billDetailsData[this.billDetailsData.length - 1].lineNumber;
        let indexToStartFrom = count.substring(count.length - 1);
        this.counter = parseInt(indexToStartFrom) + 1;
        this.pMFieldForm.push(this.createGroup(this.counter));
        this.counter++;
      } else{
        this.pMFieldForm.push(this.createGroup(this.counter));
      }
    } else {
      this.pMFieldForm.push(this.createGroup(this.counter));
      this.counter++;
    }
    
  }

  editGroup(editObj){
      let viewMode = this.data.payLoad.viewMode;
      let sethasAttach = false;
      let setEditAttach = "";
      if(editObj.attachDoc !="undefined" && editObj.attachDoc !=null){
        setEditAttach = editObj.attachDoc.fileName;
      } 
      let timeStmTobillDate = new Date(editObj.billDate);
      this.pMFormGroup= new FormGroup({
        billNo:new FormControl({value:editObj.billNumber,disabled:viewMode},Validators.required),
        billDate:new FormControl({value:timeStmTobillDate,disabled:viewMode}),
        requestedAmt:new FormControl({value:editObj.requestedAmount, disabled:viewMode},Validators.required), 
        remarks:new FormControl({value:editObj.remarks, disabled:viewMode}),
        attachment:new FormControl(setEditAttach),
        lineNo: new FormControl(editObj.lineNumber),
      });
      
      return this.pMFormGroup;
    }

  onSubmitConfirmation(actionStatus){
    this.lineNumberDupli = this.reimbursmentService.checkDuplicateRowVal(this.pMFieldForm.value);
    if(this.lineNumberDupli.length >0){
      let duplMsg ="Entries at "+this.lineNumberDupli.join() +" should not same"; 
      this.messageService.showMessage(
        duplMsg,
        "Error",
        "warning-icon",
        "CLOSE"
      );
      return; 
    }
    let confiMessage="";
    if(actionStatus =="draft"){
      this.reimbursementStatusKey="N";
      confiMessage="Do you want to Save as Draft?";
    }else if(actionStatus=="submit") {
      this.reimbursementStatusKey="T";
      confiMessage="Ensure all supporting documents are attached. Do you want to save?";
    }
    this.messageService.showConfirmation(
      confiMessage,
        "Confirmation",
        "confirmation-icon",
        reason => {
          if (reason === "YES") {
            this.createPMPayLoad('', 'create');
          }
        });
    }
    
  onCancel(): void {
    this.dialogRef.close();
  }
    /**
   * handle file from browsing
   */
  fileBrowseHandler(files,i) {
    this.prepareFilesList(files,i);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  
  pMCreateAndEdit(totalAmt, opr) {
    let lineNumber = '';
    for (let [index, guestObj] of this.pMFieldForm.value.entries()) {
      totalAmt = totalAmt + parseInt(guestObj.requestedAmt);
      this.pMbillDetails.attachDoc = null; //case of create
      this.pMbillDetails.billNumber = guestObj.billNo;
      this.pMbillDetails.billDate = new Date(guestObj.billDate).getTime();
      this.pMbillDetails.billAmount = guestObj.requestedAmt;
      this.pMbillDetails.remarks = guestObj.remarks;
      this.pMbillDetails.requestedAmount = guestObj.requestedAmt;
      this.pMbillDetails.claimNumber = this.claimNumber ? this.claimNumber : this.addAttachmentKey == 'A' ? ' ': '';
      this.pMbillDetails.lineNumber = guestObj.lineNo;
      let claimDetailObj = JSON.parse(JSON.stringify(this.pMbillDetails));
      this.setClaimDetail.push(claimDetailObj);
      console.log(this.setClaimDetail);
    }
    var finalPayLoad = this.createFinalPayLoad(
      this.setClaimDetail,
      totalAmt
    );
    this.hitOperationApi(0, finalPayLoad, opr);
  }

  prepareFilesList(files: Array<any>,index) {
    if(files.length>0){
      if (index != -1 && this.attachFiles.length > index) {
          this.attachFiles[index] = files[0];
        } else {
          this.attachFiles.push(files[0]);
        }
      
      this.pMFieldForm.controls[index]['controls'].attachment.value = files[0].name;
      this.createPMPayLoad(index, 'addAttachment');
    } 
  }

createPMPayLoad(index,opr){ //handle all operation payalod
  let totalAmt = 0; //total Amt of all claim
  this.setClaimDetail = [];
  if (opr == 'addAttachment') {
    this.addAttachmentFuctionality(index, totalAmt, opr);
   } else if (opr == 'deleteAttachment') {
    this.deleteAttachmentFunctionality(index, opr);
   } 
   else if (opr == 'deleteRow') {
    this.deleteFormRow(index, opr);
  } 
  else if (opr == 'create') {
    this.pMCreateAndEdit(totalAmt, opr);
  }
}

addAttachmentFuctionality(index, totalAmt, opr) {
  this.addAttachmentKey = 'A';
  let lineNumber = this.pMFieldForm.controls[index]['controls'].lineNo
    .value;
  this.pMbillDetails.lineNumber = lineNumber;
  totalAmt =
    totalAmt +
    parseInt(
      this.pMFieldForm.controls[index]['controls'].requestedAmt.value
    );
  this.pMbillDetails.attachDoc = null; //case of cremedicalObjate
  this.pMbillDetails.billNumber = this.pMFieldForm.controls[index][
    'controls'
  ].billNo.value;
  this.pMbillDetails.billDate = new Date(
    this.pMFieldForm.controls[index]['controls'].billDate.value
  ).getTime();
  this.pMbillDetails.billAmount = this.pMFieldForm.controls[index][
    'controls'
  ].requestedAmt.value;
  this.pMbillDetails.remarks = this.pMFieldForm.controls[index][
    'controls'
  ].remarks.value;
  this.pMbillDetails.requestedAmount = this.pMFieldForm.controls[index][
    'controls'
  ].requestedAmt.value;
  this.pMbillDetails.claimNumber = this.claimNumber
      ? this.claimNumber
      : this.addAttachmentKey == 'A'
      ? ' '
      : '';
  
  let claimDetailObj = JSON.parse(JSON.stringify(this.pMbillDetails));
  this.setClaimDetail.push(claimDetailObj);
  console.log(this.setClaimDetail);
  var finalPayLoad = this.createFinalPayLoad(this.setClaimDetail, 0);
  this.hitOperationApi(index, finalPayLoad, opr);
}

deleteAttachmentFunctionality(index, opr) {
  this.attachmentGTObj.fileName = this.attachFiles[index].fileName;
  this.attachmentGTObj.claimNumber = this.claimNumber;
  this.attachmentGTObj.reimbursementType = this.sapCode;
  this.attachmentGTObj.fileType = '.pdf';
  this.attachmentGTObj.deleteFlag = false;
  this.attachmentGTObj.lineNumber = this.pMFieldForm.controls[index][
    'controls'
  ].lineNo.value;

  let claimDetailObj = JSON.parse(JSON.stringify(this.attachmentGTObj));
  this.hitOperationApi(index, claimDetailObj, opr);
}

deletePMForm(index) {
  let lineNumber = '';
  lineNumber = this.pMFieldForm.controls[index]['controls'].lineNo.value;
  this.pMFieldForm.removeAt(index);
  this.displayFiles[index] = [];
  this.attachFiles.splice(index, 1);
  this.lineNoToDelete.push(lineNumber);
  this.createPMPayLoad(index, 'deleteRow');
}

deleteFormRow(index, opr) {
  this.setClaimDetail = null;
  var finalPayLoad = this.createFinalPayLoad(this.setClaimDetail, 0);
  this.hitOperationApi(index, finalPayLoad, opr);
}

hitOperationApi(index, payload, opr) {
  console.log(opr);
  if (opr == 'addAttachment') {
    this.reimbursmentService
      .addAttachment(payload, this.attachFiles[index])
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
        this.pMFieldForm.controls[index]['controls'].attachment.value='';
        this.attachFiles[index] =null;
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
        let msgObj=  JSON.parse(data.responseData);
        this.messageService.showMessage(
          msgObj.message,
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
createFinalPayLoad(obj, totalAmt) {
  var payload = {
    claimDetail: obj,
    reimbursementType: this.sapCode,
    totalAmount: totalAmt != 0 ? totalAmt : 0,
    requestOperation: this.data.payLoad.setOperation == 'Edit' ? 'EE' : 'EC',
    deletedLineNumber: this.lineNoToDelete,
    claimNumber: this.claimNumber ? this.claimNumber : ' ',
    reimbursementStatus: this.reimbursementStatusKey
      ? this.reimbursementStatusKey
      : '',
    requestNumberNC: '',
  };
  console.log(payload);
  return payload;
}

pMNumericValidation(event,index,grp) {
    let numericVal = this.reimbursmentService.spacevalidation(event);
    if (numericVal) {
      let inputVal = event.target.value.slice(1, -1);
      grp.get(event.target.name).patchValue(inputVal);
    } else {
      if(this.reimbursmentService.setNumeric(event.target.value)){
        let inputVal = event.target.value.slice(0, -1);
        grp.get(event.target.name).patchValue(inputVal);
      }
    }
  }

  firstSpaceValidate(event,index,grp){
    let isNotValid = this.reimbursmentService.spacevalidation(event);
    if (isNotValid) {
      let inputVal = event.target.value.slice(1, -1);
      grp.get(event.target.name).patchValue(inputVal);
    }
  }

  //Drag and Drop functionality changes
  onFileDrops(data,i){
    this.prepareFilesList(data.files, i);
  }

  openPdf(data: any, index: number): void {
    let name = '';    
    if(data.imageUrlClicked){
      name = data.fileClicked.name.split('.')[0];
      this.onViewPdf(data.fileClicked, name);
    } else {
      name = this.attachFiles[index] ? this.attachFiles[index].fileName.split('.')[0]: '';
     let obj = {
      sapCode: this.attachFiles[index].reimbursementType,
      claimNo: this.attachFiles[index].claimNumber,
      lineNo: this.attachFiles[index].lineNumber 
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
  deleteAttachmentFile(data: any,index: number): void {
    this.createPMPayLoad(index, 'deleteAttachment');
    this.pMFieldForm.controls[index]['controls'].attachment.value ='';
    this.attachFiles[index] = null;
  }

  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0){
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      });
    }
  }
}
