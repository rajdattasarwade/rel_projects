import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { getYear, getMonth, getDaysInMonth, getDate } from 'date-fns';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import {
  ReimbursementsDetails,
  AttachDoc,
} from '../../../utils/reimbursements.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-deputation-other',
  templateUrl: './deputation-other.component.html',
  styleUrls: ['./deputation-other.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DeputationOtherComponent implements OnInit {
  deputationOtherForm: FormGroup; //its a form group
  deputationOtherArray: FormArray; // its a form array (supporting dynamic thinf)
  reimbursementTextTitle: any; //store reimbursement title
  setMaxDate: any; //date from which calendar should be disabled
  attachedFiles: any[] = []; //files attached array
  isFileuploadFoodValid: boolean = false; // check if uploaded file valid or not
  confirmationMsg: string; // customize msg and store in this field to show anywhere on this component
  attachObj = {
    // for response AttachObj(create/edit)
    attachDoc: null,
  };
  claimObj: ReimbursementsDetails = new ReimbursementsDetails(this.attachObj); //primarily for create
  attachmentObj: AttachDoc = new AttachDoc([]);
  editClaimObj: ReimbursementsDetails[] = []; //primarily for edit
  setClaimDetailObj: any = []; //final payload for claimObj
  attachFiles: any = []; //array of files attached
  sapCode: any; // store sapCode in case of edit and create
  lineNoToDelete: string[] = []; //store list of linenumbers to delete if full section is removed in case of edit
  counter = 1;
  claimNumber: any;
  reimbursementStatusKey: string = '';
  // filename: string = '';
  addAttachmentKey: string = '';
  totalAmountDis: any;
  amount: any;
  balanceAmount: any;
  expenseType: any;
  statusSaved: boolean = false;
  isView: boolean;
  subscriptionList: Subscription[] = [];
  displayFiles: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reimbursmentService: ReimbursementsService,
    private messageService: MessageModalService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.deputationOtherArray = new FormArray([]);
    this.disableFutureDates();

    this.lineNoToDelete = [];
    if (this.data.payLoad.setOperation == 'Edit') {
      this.isView = this.data.payLoad.viewMode;
      var typeDetailPayLoadFromPopup = JSON.parse(
        JSON.stringify(this.data.payLoad.typeDetails)
      );
      if (this.data.payLoad.typeDetails.statusText.includes('Saved')) {
        this.statusSaved = true;
      } else {
        this.statusSaved = false;
      }
      this.reimbursementTextTitle = this.data.payLoad.typeDetails.reimbursementTypeKey.value;
      this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;
      this.getExpensetype();
      this.reimbursmentService
        .getClaimBills(typeDetailPayLoadFromPopup.claimNumber)
        .subscribe(
          (data: ReimbursementsDetails[]) => {
            //billDetails
            this.editClaimObj = data;

            if (this.editClaimObj.length) {
              for (let editObj of this.editClaimObj) {
                this.claimNumber = this.editClaimObj[0].claimNumber;
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

                this.deputationOtherArray.push(
                  this.editDeputationOtherForm(editObj)
                );
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.statusSaved = false;
      this.reimbursementTextTitle = this.data.typeDetails.reimbursementType.value;
      this.sapCode = this.data.typeDetails.reimbursementType.sapCode;
      this.getExpensetype();

      this.addDepuationOtherForm();
    }
  }

  createDepuationOtherForm(counter) {
    this.deputationOtherForm = new FormGroup({
      billNo: new FormControl('', Validators.required),
      billDate: new FormControl('', Validators.required),
      expensePurpose: new FormControl(''),
      billAmount: new FormControl('', Validators.required),
      attachment: new FormControl(''),
      type: new FormControl('', Validators.required),
      lineNo: new FormControl('000' + counter),
    });
    return this.deputationOtherForm;
  }

  addDepuationOtherForm() {
    if (this.editClaimObj.length > 0) {
      if (this.counter == 1) {
        let count = this.editClaimObj[this.editClaimObj.length - 1].lineNumber;
        let indexToStartFrom = count.substring(count.length - 1);
        this.counter = parseInt(indexToStartFrom) + 1;
        this.deputationOtherArray.push(
          this.createDepuationOtherForm(this.counter)
        );
      } else {
        this.deputationOtherArray.push(
          this.createDepuationOtherForm(this.counter)
        );
        this.counter++;
      }
    } else {
      this.deputationOtherArray.push(
        this.createDepuationOtherForm(this.counter)
      );
      this.counter++;
    }
  }

  disableFutureDates() {
    let year = getYear(new Date());
    let month = getMonth(new Date()) + 1;
    let todayDate = getDate(new Date());
    let endMonthValidationDt = year + ',' + month + ',' + todayDate;
    this.setMaxDate = new Date(endMonthValidationDt);
  }

  editDeputationOtherForm(editObj) {
    let viewMode = this.data.payLoad.viewMode;
    let setEditAttach = '';
    if (editObj.attachDoc != 'undefined' && editObj.attachDoc != null) {
      setEditAttach = editObj.attachDoc.fileName;
    }
    this.deputationOtherForm = new FormGroup({
      billNo: new FormControl({ value: editObj.billNumber,disabled: viewMode }, Validators.required),
      billDate: new FormControl({ value: new Date(editObj.billDate),disabled: viewMode }
        ,
        Validators.required
      ),
      billAmount: new FormControl({ value: editObj.requestedAmount,disabled: viewMode }, Validators.required),
      expensePurpose: new FormControl({ value: editObj.remarks,disabled: viewMode }),
      attachment: new FormControl({ value: setEditAttach,disabled: viewMode }),
      lineNo: new FormControl(editObj.lineNumber),
      type: new FormControl({ value: editObj.otherReimbursementType,disabled: viewMode}),
    });
    //this.deputationfoodForm.get('attachment').setValue(setEditAttach);

    return this.deputationOtherForm;
  }

  fileBrowseFoodExpenseHandler(files, i) {
    this.prepareFilesList(files, i);
  }

  onFileDrops(data, index): void {        
    this.prepareFilesList(data.files, index);
  }

  deleteAttachmentFile(data: any,index: number): void {
    this.confirmAttachmentDelete(index);
  }


  prepareFilesList(files: Array<any>, index) {

    
    if (files.length > 0) {if (files.length > 0) {
      if (index !== -1 && this.attachedFiles.length > index) {
        this.attachedFiles[index] = files[0];
      } else {
        this.attachedFiles.push(files[0]);
      }
      this.deputationOtherArray.controls[index]['controls'].attachment.value =
        files[0].name;
    this.createPayLoad(index, 'addAttachment');
  }
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
    let lineNumber = this.deputationOtherArray.controls[index]['controls']
      .lineNo.value;
    this.claimObj.lineNumber = lineNumber;
    totalAmt =
      totalAmt +
      parseInt(
        this.deputationOtherArray.controls[index]['controls'].billAmount.value
      );
    this.claimObj.attachDoc = null; //case of cremedicalObjate
    this.claimObj.billNumber = this.deputationOtherArray.controls[index][
      'controls'
    ].billNo.value;
    this.claimObj.billDate = new Date(
      this.deputationOtherArray.controls[index]['controls'].billDate.value
    ).getTime();
    this.claimObj.billAmount = this.deputationOtherArray.controls[index][
      'controls'
    ].billAmount.value;
    this.claimObj.remarks = this.deputationOtherArray.controls[index][
      'controls'
    ].expensePurpose.value;
    this.claimObj.requestedAmount = this.deputationOtherArray.controls[index][
      'controls'
    ].billAmount.value;
    this.claimObj.claimNumber = this.claimNumber
      ? this.claimNumber
      : this.addAttachmentKey == 'A'
      ? ' '
      : '';
    // if(this.data.payLoad.setOperation=="Edit" && index < this.editClaimObj.length ){
    //   this.claimObj.lineNumber = this.editClaimObj[index].lineNumber;
    //   } else {
    //     this.claimObj.lineNumber = '000' + this.medicalFormArray.controls[index]['controls'].lineNo.value;
    //   }

    let claimDetailObj = JSON.parse(JSON.stringify(this.claimObj));
    this.setClaimDetailObj.push(claimDetailObj);
    console.log(this.setClaimDetailObj);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);

    this.hitOperationApi(index, finalPayLoad, opr);
  }

  deleteAttachmentFunctionality(index, opr) {
    this.attachmentObj.fileName = this.attachedFiles[index].name;
    this.attachmentObj.claimNumber = this.claimNumber;
    // this.attachmentObj.fileName = this.filename;
    this.attachmentObj.reimbursementType = this.sapCode;
    this.attachmentObj.fileType = '.pdf';
    this.attachmentObj.deleteFlag = false;
    // if(this.data.payLoad.setOperation=="Edit" && index < this.editClaimObj.length ){
    //   this.attachmentObj.lineNumber = this.editClaimObj[index].lineNumber;
    //   } else {
    // if(this.medicalFormArray.controls[index] != undefined){
    this.attachmentObj.lineNumber = this.deputationOtherArray.controls[index][
      'controls'
    ].lineNo.value;

    // }else{
    //   this.attachmentObj.lineNumber = this.lineNoToDelete[0];
    //   this.lineNoToDelete = [];
    // }

    // }
    // this.attachmentObj.lineNumber = '000' + (index + 1);
    console.log(this.attachmentObj);
    let claimDetailObj = JSON.parse(JSON.stringify(this.attachmentObj));
    this.hitOperationApi(index, claimDetailObj, opr);
  }

  deleteRow(index, opr) {
    this.setClaimDetailObj = null;
    console.log(this.setClaimDetailObj);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);
    console.log(opr);
    this.hitOperationApi(index, finalPayLoad, opr);
  }

  createAndEdit(totalAmt, opr) {
    let lineNumber = '';
    for (let [index, medicalObj] of this.deputationOtherArray.value.entries()) {
      totalAmt = totalAmt + parseInt(medicalObj.billAmount);
      this.claimObj.attachDoc = null; //case of create
      this.claimObj.billNumber = medicalObj.billNo;
      this.claimObj.billDate = new Date(medicalObj.billDate).getTime();
      this.claimObj.billAmount = medicalObj.billAmount;
      this.claimObj.remarks = medicalObj.expensePurpose;
      this.claimObj.requestedAmount = medicalObj.billAmount;
      this.claimObj.otherReimbursementType = medicalObj.type;
      this.claimObj.claimNumber = this.claimNumber
        ? this.claimNumber
        : this.addAttachmentKey == 'A'
        ? ' '
        : '';
      // if(this.data.payLoad.setOperation=="Edit" && index < this.editClaimObj.length ){
      //   this.claimObj.lineNumber = this.editClaimObj[index].lineNumber;
      //   } else {
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
      reimbursementStatus: this.reimbursementStatusKey
        ? this.reimbursementStatusKey
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
          let msg = JSON.parse(data.responseData);
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
  openErrorPopup(): void {
    this.messageService.showMessage(
      'Error in loading attchment, Please try again',
      'Error',
      'warning-icon',
      'CLOSE'
    );
  }
  onViewPdf(data: any, name: string): void {
    let file = new Blob([data],{type: 'application/pdf'});
    let pdfUrl = URL.createObjectURL(file);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = pdfUrl;
    dialogRef.componentInstance.title = name;
    dialogRef.componentInstance.pdfName = name;
  }

  confirmAttachmentDelete(index) {
    
   
    this.createPayLoad(index, 'deleteAttachment');
    this.deputationOtherArray.controls[index][
      'controls'
    ].attachment.value = '';
    
    this.attachedFiles[index] = null;
    
  }

  deleteDepuationOtherForm(index) {
    let lineNumber = '';
    // if(this.data.payLoad.setOperation=="Edit" && index < this.editClaimObj.length ){
    //   lineNumber = this.editClaimObj[index].lineNumber;
    //   } else {
    lineNumber = this.deputationOtherArray.controls[index]['controls'].lineNo
      .value;
    // }
    this.deputationOtherArray.removeAt(index);
    // this.editClaimObj.splice(index, 1);
    this.attachedFiles.splice(index, 1);
    this.lineNoToDelete.push(lineNumber);
    this.createPayLoad(index, 'deleteRow');
  }

  onCancelAction() {
    this.dialogRef.close();
  }

  deputationOtherFormSaveSubmitConfirmation(actionOpr) {
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

  checkIfDuplicateEntryPresent() {
    let lineNoForDuplicateVal = this.reimbursmentService.checkDuplicateTypeVal(
      this.deputationOtherArray.value
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

  getExpensetype() {
    // this.sapCode= //
    console.log(this.sapCode);
    this.reimbursmentService
      .getDropDownsForReimbursement(this.sapCode)
      .subscribe(
        (data) => {
          data['TYPE_OF_EXPENSE'] = data['TYPE_OF_EXPENSE'].filter(
            (item) => item.code !== 'ZISPACE'
          );
          this.expenseType = data['TYPE_OF_EXPENSE'];
        },
        (err) => {
          console.log(err);
        }
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
