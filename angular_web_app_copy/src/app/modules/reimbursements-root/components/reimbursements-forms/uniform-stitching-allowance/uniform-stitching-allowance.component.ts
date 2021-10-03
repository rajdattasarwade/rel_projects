import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getYear, getMonth, getDate } from 'date-fns';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import { AttachDoc, ReimbursementsDetails } from '../../../utils/reimbursements.model';

@Component({
  selector: 'app-uniform-stitching-allowance',
  templateUrl: './uniform-stitching-allowance.component.html',
  styleUrls: ['./uniform-stitching-allowance.component.css']
})
export class UniformStitchingAllowanceComponent implements OnInit, OnDestroy {
  uniformStitchingForm: FormGroup; //its a form group
  stitchingFormArray: FormArray; // its a form array (supporting dynamic thinf)
  reimbursementTextTitle: any; //store reimbursement title
  setMaxDate: any; //date from which calendar should be disabled
  attachedFiles: any[] = []; //files attached array
  confirmationMsg: string; // customize msg and store in this field to show anywhere on this component
  setClaimDetail = [];
  sapCode: string;
  claimNumber: string;
  reimbursementStatusKey: string;
  obj = {
    attachDoc:null
  }
  payload:any;
  claimObj: ReimbursementsDetails = new ReimbursementsDetails(this.obj);
  editClaimObj: ReimbursementsDetails[] = [];
  tempDeleteForm: string[] = [];
  isView: boolean;
  filesArray = [{name: 'abc.pdf'}]
  setClaimDetailObj: any[];
  lineNoToDelete: string[] = []; //store list of linenumbers to delete if full section is removed in case of edit
  attachmentObj: AttachDoc = new AttachDoc([]);
  displayFiles: any[] = [];
  addAttachmentKey: string = '';
  subscriptionList: Subscription[] = [];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  statusText: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reimbursmentService: ReimbursementsService,
    private messageService: MessageModalService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {    
    this.tempDeleteForm = [];
    this.stitchingFormArray = new FormArray([]);
    this.lineNoToDelete = [];
    this.disableFutureDates();
    if(this.data.payLoad.setOperation === 'Edit') {
      this.isView = this.data.payLoad.viewMode;
      this.statusText =  this.data.payLoad.typeDetails.statusText.includes('Saved') ? true : false;
      this.reimbursementTextTitle = this.data.payLoad.typeDetails.reimbursementTypeKey.value;
      this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;
      this.setStitchingFormValue(this.data.payLoad.typeDetails);
    } else {
      this.statusText = false;
      this.reimbursementTextTitle = this.data.typeDetails.reimbursementType.value;
      this.sapCode = this.data.typeDetails.reimbursementType.sapCode;
      this.addUniformStitchingForm();
    }
  }

  createUniformStitchingForm(data: any): FormGroup {
    let attachment = '';
    if(data){
      attachment = data.attachDoc ? data.attachDoc.fileName: '';
    }
    this.uniformStitchingForm = new FormGroup({
      billNo: new FormControl({value: data ? data.billNumber:'', disabled: this.isView} , Validators.required),
      billDate: new FormControl({value: data ? new Date(data.billDate):'', disabled: this.isView}, Validators.required),
      expensePurpose: new FormControl({value: data ? data.remarks:'', disabled: this.isView}),
      billAmount: new FormControl({value: data ? data.requestedAmount:'', disabled: this.isView}, Validators.required),
      attachment: new FormControl({value: data ? attachment:'', disabled: this.isView}),
      lineNumber: new FormControl({value: data ? data.lineNumber:'', disabled: this.isView})
    });
    return this.uniformStitchingForm;
  }

  addUniformStitchingForm(): void {
    this.stitchingFormArray.push(this.createUniformStitchingForm(''));
  }

  disableFutureDates(): void {
    let year = getYear(new Date());
    let month = getMonth(new Date()) + 1;
    let todayDate = getDate(new Date());
    let endMonthValidationDt = year + ',' + month + ',' + todayDate;
    this.setMaxDate = new Date(endMonthValidationDt);
  }
  setStitchingFormValue(claimsData: any): void {
    this.subscriptionList.push(
      this.reimbursmentService.getClaimBills(claimsData.claimNumber).subscribe((data: any) => {
        if(data) {
          this.editClaimObj = data;
           if(this.editClaimObj.length > 0) {
            this.claimNumber = this.editClaimObj[0].claimNumber;
             this.editClaimObj.forEach(item => {
              this.attachedFiles.push(item.attachDoc);
              if(item.attachDoc){
                let obj = {
                  name: item.attachDoc.fileName,
                  lineNumber: item.attachDoc.lineNumber
                }
                this.displayFiles.push([obj]);
              }else{
                this.displayFiles.push([]);
              }
             
              this.stitchingFormArray.push(this.createUniformStitchingForm(item))
             });
           }
        }
      })
    );
  }
  fileBrowseHandler(files, i): void {
    this.prepareFilesList(files, i);
  }

  prepareFilesList(files: Array<any>, index): void {
    if (files.length > 0) {
        if (index !== -1 && this.attachedFiles.length > index) {
          this.attachedFiles[index] = files[0];
        } else {
          this.attachedFiles.push(files[0]);
        }
        this.stitchingFormArray.controls[index]['controls'].attachment.value =
          files[0].name;
      this.createPayLoad(index, 'addAttachment');
  }
  }

  deleteAttachmentFile(data: any,index: number): void {
    this.confirmAttachmentDelete(index);
  }

  confirmAttachmentDelete(index): void {
    this.createPayLoad(index, 'deleteAttachment');
    this.stitchingFormArray.controls[index]['controls'].attachment.value ='';
    this.attachedFiles[index] = null;
  }

  deleteUniformStitchingForm(index): void {
    let lineNumber = this.stitchingFormArray.controls[index]['controls'].lineNumber.value;
    lineNumber = lineNumber ? lineNumber: '000'+(index+1);
    this.stitchingFormArray.removeAt(index);
    this.displayFiles[index] = [];
    this.attachedFiles.splice(index, 1);
    this.lineNoToDelete.push(lineNumber);
    this.createPayLoad(index, 'deleteRow');
  }

  onCancelAction(): void {
    this.dialogRef.close();
  }

  uniformStitchingFormSaveSubmitConfirmation(actionOpr): void {
    
    let isDuplicateValPresent = this.checkIfDuplicateEntryPresent();
    if (!isDuplicateValPresent) {
      if (actionOpr == 'draft') {
        this.reimbursementStatusKey = 'N';
        this.confirmationMsg = 'Do you want to Save as Draft?';
      } else {
        this.reimbursementStatusKey = 'T';
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

  checkIfDuplicateEntryPresent(): boolean {
    let lineNoForDuplicateVal = this.reimbursmentService.checkDuplicateRowVal(
      this.stitchingFormArray.value
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

  onFileDrops(data, index): void {        
    this.prepareFilesList(data.files, index);
  }

  createPayLoad(index, opr): void {
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

  addAttachmentFuctionality(index, totalAmt, opr): void {
    this.addAttachmentKey = 'A';
    let lineNumber = this.stitchingFormArray.controls[index]['controls'].lineNumber.value;
    this.claimObj.lineNumber = lineNumber ? lineNumber: '000'+ (index + 1);
    totalAmt =
      totalAmt +
      parseInt(
        this.stitchingFormArray.controls[index]['controls'].billAmount.value
      );
    this.claimObj.attachDoc = null; //case of cremedicalObjate
    this.claimObj.billNumber = this.stitchingFormArray.controls[index][
      'controls'
    ].billNo.value;
    this.claimObj.billDate = new Date(
      this.stitchingFormArray.controls[index]['controls'].billDate.value
    ).getTime();
    this.claimObj.billAmount = this.stitchingFormArray.controls[index][
      'controls'
    ].billAmount.value;
    this.claimObj.remarks = this.stitchingFormArray.controls[index][
      'controls'
    ].expensePurpose.value;
    this.claimObj.requestedAmount = this.stitchingFormArray.controls[index][
      'controls'
    ].billAmount.value;
    this.claimObj.claimNumber = this.claimNumber ? this.claimNumber: this.addAttachmentKey == 'A'? ' ': '';
   
    let claimDetailObj = JSON.parse(JSON.stringify(this.claimObj));
    this.setClaimDetailObj.push(claimDetailObj);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);
    this.hitOperationApi(index, finalPayLoad, opr);
  }
  createFinalPayLoad(obj, totalAmt): any {
    var payload = {
      claimDetail: obj,
      reimbursementType: this.sapCode,
      totalAmount: totalAmt != 0 ? totalAmt : 0,
      requestOperation: this.data.payLoad.setOperation == 'Edit' ? 'EE' : 'EC',
      deletedLineNumber: this.lineNoToDelete,
      claimNumber: this.claimNumber ? this.claimNumber : this.addAttachmentKey == 'A' ? ' ' : '',
      reimbursementStatus: this.reimbursementStatusKey
        ? this.reimbursementStatusKey
        : '',
      requestNumberNC: '',
    };
    return payload;
  }
  hitOperationApi(index, payload, opr): void {
    if (opr == 'addAttachment') {
      this.subscriptionList.push(
        this.reimbursmentService
        .addAttachment(payload, this.attachedFiles[index])
        .subscribe(
          (data: any) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        )
      );
    } else if (opr == 'deleteAttachment') {
      this.subscriptionList.push(
        this.reimbursmentService.deleteAttachment(payload).subscribe(
          (data: any) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        )
      );
    } else if (opr == 'deleteRow') {
      this.subscriptionList.push(
        this.reimbursmentService.deleteRows(payload).subscribe(
          (data: any) => {
            this.lineNoToDelete = [];
          },
          (err) => {
            console.log(err);
          }
        )
      );
    } else if (opr == 'create') {
      this.subscriptionList.push(
        this.reimbursmentService.createClaim(payload).subscribe((data: any) => {
          if (data.responseStatus == 'FAILED') {
            this.messageService.showMessage(
              data.systemErrMsg,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          } else {
            this.messageService.showMessage(
              data.message,
              'Success',
              'success-icon',
              'CLOSE'
            );
            this.dialogRef.close('success');
          }
        })
      );
    } else {
    }
  }

  deleteAttachmentFunctionality(index, opr): void {
    this.attachmentObj.fileName = this.attachedFiles[index].name;
    this.attachmentObj.claimNumber = this.claimNumber;
    this.attachmentObj.reimbursementType = this.sapCode;
    this.attachmentObj.fileType = '.pdf';
    this.attachmentObj.deleteFlag = false;
    this.attachmentObj.lineNumber = this.editClaimObj[index] ? this.editClaimObj[index].lineNumber:'000'+ (index + 1);

    let claimDetailObj = JSON.parse(JSON.stringify(this.attachmentObj));
    this.hitOperationApi(index, claimDetailObj, opr);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);
    this.hitOperationApi(index, finalPayLoad, opr);
  }
  deleteRow(index, opr): void {
    this.setClaimDetailObj = null;
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);
    this.hitOperationApi(index, finalPayLoad, opr);
  }

  createAndEdit(totalAmt, opr): void {
    for (let [index, medicalObj] of this.stitchingFormArray.value.entries()) {
      totalAmt = totalAmt + parseInt(medicalObj.billAmount);
      this.claimObj.attachDoc = null; //case of create
      this.claimObj.billNumber = medicalObj.billNo;
      this.claimObj.billDate = new Date(medicalObj.billDate).getTime();
      this.claimObj.billAmount = medicalObj.billAmount;
      this.claimObj.remarks = medicalObj.expensePurpose;
      this.claimObj.requestedAmount = medicalObj.billAmount;
      this.claimObj.claimNumber = this.claimNumber ? this.claimNumber : this.addAttachmentKey == 'A' ? ' ' : '';     
      this.claimObj.lineNumber = medicalObj.lineNumber? medicalObj.lineNumber: '000'+( index + 1);
      
      let claimDetailObj = JSON.parse(JSON.stringify(this.claimObj));
      this.setClaimDetailObj.push(claimDetailObj);
    }
    var finalPayLoad = this.createFinalPayLoad(
      this.setClaimDetailObj,
      totalAmt
    );
    this.addAttachmentKey = '';
    this.hitOperationApi(0, finalPayLoad, opr);
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
        }else{
          this.openErrorPopup();
        }
      }, error => {
        this.openErrorPopup();
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;    
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  openErrorPopup(): void {
    this.messageService.showMessage(
      'Error in loading attchment, Please try again',
      'Error',
      'warning-icon',
      'CLOSE'
    );
  }
  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0){
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      });
    }
  }
}
