import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { getYear, getMonth, getDate } from 'date-fns';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import {
  AttachDoc,
  ReimbursementsDetails,
} from '../../../utils/reimbursements.model';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-aviation-medical-reimb',
  templateUrl: './aviation-medical-reimb.component.html',
  styleUrls: ['./aviation-medical-reimb.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AviationMedicalReimbComponent implements OnInit {
  subscriptionList: Subscription[] = [];
  aviationMedicalForm: FormGroup; //its a form group
  medicalFormArray: FormArray; // its a form array (supporting dynamic thinf)
  reimbursementTextTitle: any; //store reimbursement title
  setMaxDate: any; //date from which calendar should be disabled
  attachedFiles: any[] = []; //files attached array
  isFileUploadedValid: boolean = false; // check if uploaded file valid or not
  disableBtn: boolean = true;
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
  isClaimStatusSubmitted: boolean = false;
  isView: boolean;
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
    this.medicalFormArray = new FormArray([]);
    this.disableFutureDates();
    this.lineNoToDelete = [];
    if (this.data.payLoad.setOperation == 'Edit') {
      this.isView = this.data.payLoad.viewMode;
      var typeDetailPayLoadFromPopup = JSON.parse(
        JSON.stringify(this.data.payLoad.typeDetails)
      );
      if (this.data.payLoad.typeDetails.statusText.includes('Saved')) {
        this.isClaimStatusSubmitted = true;
      } else {
        this.isClaimStatusSubmitted = false;
      }
      this.reimbursementTextTitle = this.data.payLoad.typeDetails.reimbursementTypeKey.value;
      this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;
      this.reimbursmentService
        .getClaimBills(typeDetailPayLoadFromPopup.claimNumber)
        .subscribe(
          (data: ReimbursementsDetails[]) => {
            //claimObj
            this.editClaimObj = data;

            if (this.editClaimObj.length) {
              for (let editObj of this.editClaimObj) {
                this.claimNumber = this.editClaimObj[0].claimNumber;
                this.attachedFiles.push(editObj.attachDoc);
                if (editObj.attachDoc) {
                  let obj = {
                    name: editObj.attachDoc.fileName,
                    lineNumber: editObj.attachDoc.lineNumber,
                  };
                  this.displayFiles.push([obj]);
                } else {
                  this.displayFiles.push([]);
                }

                this.medicalFormArray.push(
                  this.editAviationMedicalForm(editObj)
                );
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.isClaimStatusSubmitted = false;
      this.reimbursementTextTitle = this.data.typeDetails.reimbursementType.value;
      this.sapCode = this.data.typeDetails.reimbursementType.sapCode;
      this.addAviationMedicalForm();
    }
  }

  createAviationMedicalForm(counter) {
    this.aviationMedicalForm = new FormGroup({
      billNo: new FormControl('', Validators.required),
      billDate: new FormControl('', Validators.required),
      expensePurpose: new FormControl(''),
      billAmount: new FormControl('', Validators.required),
      attachment: new FormControl('', Validators.required),
      lineNo: new FormControl('000' + counter),
    });
    return this.aviationMedicalForm;
  }

  addAviationMedicalForm() {
    if (this.editClaimObj.length > 0) {
      if (this.counter == 1) {
        let count = this.editClaimObj[this.editClaimObj.length - 1].lineNumber;
        let indexToStartFrom = count.substring(count.length - 1);
        this.counter = parseInt(indexToStartFrom) + 1;
        this.medicalFormArray.push(
          this.createAviationMedicalForm(this.counter)
        );
      } else {
        this.medicalFormArray.push(
          this.createAviationMedicalForm(this.counter)
        );
        this.counter++;
      }
    } else {
      this.medicalFormArray.push(this.createAviationMedicalForm(this.counter));
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

  editAviationMedicalForm(editObj) {
    let viewMode = this.data.payLoad.viewMode;
    let setEditAttach = '';
    if (editObj.attachDoc != 'undefined' && editObj.attachDoc != null) { 

      setEditAttach = editObj.attachDoc.fileName;
    }
    this.aviationMedicalForm = new FormGroup({
      billNo: new FormControl({ value: editObj.billNumber,disabled: viewMode }, Validators.required),
      billDate: new FormControl(
        { value: new Date(editObj.billDate),disabled: viewMode },
        Validators.required
      ),
      billAmount: new FormControl({ value: editObj.requestedAmount,disabled: viewMode }, Validators.required),
      expensePurpose: new FormControl({ value: editObj.remarks,disabled: viewMode }),
      attachment: new FormControl({ value: setEditAttach, disabled: viewMode },Validators.required),
      lineNo: new FormControl(editObj.lineNumber),
    });

    return this.aviationMedicalForm;
  }

  openPdf(data: any, index: number): void {
    let name = '';
    if (data.imageUrlClicked) {
      name = data.fileClicked.name.split('.')[0];
      this.onViewPdf(data.fileClicked, name);
    } else {
      name = this.attachedFiles[index]
        ? this.attachedFiles[index].fileName.split('.')[0]
        : '';
      let obj = {
        sapCode: this.attachedFiles[index].reimbursementType,
        claimNo: this.attachedFiles[index].claimNumber,
        lineNo: this.attachedFiles[index].lineNumber,
      };
      this.subscriptionList.push(
        this.reimbursmentService.openAttachment(obj).subscribe(
          (data: any) => {
            if (data) {
              this.onViewPdf(data, name);
            }
          },
          (error) => {
            console.log(error);
          }
        )
      );
    }
  }

  onViewPdf(data: any, name: string): void {
    let file = new Blob([data], { type: 'application/pdf' });
    let pdfUrl = URL.createObjectURL(file);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = pdfUrl;
    dialogRef.componentInstance.title = name;
    dialogRef.componentInstance.pdfName = name;
  }

  fileBrowseHandler(files, i) {
    this.prepareFilesList(files, i);
  }

  onFileDrops(data, index): void {
    this.prepareFilesList(data.files, index);
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

        this.medicalFormArray.controls[index]['controls'].attachment.value =
          files[0].name;
        this.medicalFormArray.controls[index].patchValue({
          attachment: files[0].name,
        });
        this.isFileUploadedValid = false;
        this.disableBtn = false;
      } else {
        this.medicalFormArray.controls[index]['controls'].attachment.value = '';
        this.medicalFormArray.controls[index].patchValue({
          attachment: '',
        });

        this.isFileUploadedValid = true;
        this.disableBtn = true;
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
    let lineNumber = this.medicalFormArray.controls[index]['controls'].lineNo
      .value;
    this.claimObj.lineNumber = lineNumber;
    totalAmt =
      totalAmt +
      parseInt(
        this.medicalFormArray.controls[index]['controls'].billAmount.value
      );
    this.claimObj.attachDoc = null; //case of cremedicalObjate
    this.claimObj.billNumber = this.medicalFormArray.controls[index][
      'controls'
    ].billNo.value;
    this.claimObj.billDate = new Date(
      this.medicalFormArray.controls[index]['controls'].billDate.value
    ).getTime();
    this.claimObj.billAmount = this.medicalFormArray.controls[index][
      'controls'
    ].billAmount.value;
    this.claimObj.remarks = this.medicalFormArray.controls[index][
      'controls'
    ].expensePurpose.value;
    this.claimObj.requestedAmount = this.medicalFormArray.controls[index][
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
    this.attachmentObj.lineNumber = this.medicalFormArray.controls[index][
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
    console.log('in delete fun');
    console.log(opr);
    this.hitOperationApi(index, finalPayLoad, opr);
  }

  createAndEdit(totalAmt, opr) {
    let lineNumber = '';
    for (let [index, medicalObj] of this.medicalFormArray.value.entries()) {
      totalAmt = totalAmt + parseInt(medicalObj.billAmount);
      this.claimObj.attachDoc = null; //case of create
      this.claimObj.billNumber = medicalObj.billNo;
      this.claimObj.billDate = new Date(medicalObj.billDate).getTime();
      this.claimObj.billAmount = medicalObj.billAmount;
      this.claimObj.remarks = medicalObj.expensePurpose;
      this.claimObj.requestedAmount = medicalObj.billAmount;
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

  deleteAttachmentFile(data: any, index: number): void {
    this.confirmAttachmentDelete(index);
  }

  confirmAttachmentDelete(index) {
    // this.messageService.showConfirmation(
    //   'Are you sure you want to delete the selected file?.',
    //   'Confirmation',
    //   'confirmation-icon',
    //   (reason) => {
    //     if (reason === 'YES') {
    this.createPayLoad(index, 'deleteAttachment');
    this.medicalFormArray.controls[index].patchValue({
      attachment: '',
    });

    this.medicalFormArray.controls[index]['controls'].attachment.value = '';
    // if (index < this.editClaimObj.length) {
    //   this.editClaimObj[index].attachDoc.deleteFlag = true;
    // }
    this.attachedFiles[index] = null;
    // }
    //   }
    // );
  }

  deleteAviationMedicalForm(index) {
    let lineNumber = '';
    // if(this.data.payLoad.setOperation=="Edit" && index < this.editClaimObj.length ){
    //   lineNumber = this.editClaimObj[index].lineNumber;
    //   } else {
    lineNumber = this.medicalFormArray.controls[index]['controls'].lineNo.value;
    // }
    this.medicalFormArray.removeAt(index);
    // this.editClaimObj.splice(index, 1);
    this.attachedFiles.splice(index, 1);
    this.lineNoToDelete.push(lineNumber);
    this.createPayLoad(index, 'deleteRow');
  }

  onCancelAction() {
    this.dialogRef.close();
  }

  aviationFormSaveSubmitConfirmation(actionOpr) {
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
    let lineNoForDuplicateVal = this.reimbursmentService.checkDuplicateRowVal(
      this.medicalFormArray.value
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
}
