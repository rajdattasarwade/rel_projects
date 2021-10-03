import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { getYear, getMonth, getDate } from 'date-fns/fp';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import {
  AttachDoc,
  ReimbursementsDetails,
} from '../../../utils/reimbursements.model';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-monsoon-kit-allowanse',
  templateUrl: './monsoon-kit-allowanse.component.html',
  styleUrls: ['./monsoon-kit-allowanse.component.css'],
})
export class MonsoonKitAllowanseComponent implements OnInit {
  subscriptionList: Subscription[] = [];
  monsoonKitForm: FormGroup;
  monsoonKitFormArray: FormArray;
  setMaxDate: any; //date from which calendar should be disabled
  reimbursementTextTitle: any;
  attachedFiles: any[] = []; //files attached array
  isFileUploadedValid: boolean = false; // check if uploaded file valid or not
  disableBtn: boolean = true;
  setClaimDetailObj: any = []; //final payload for claimObj
  addAttachmentKey: string = '';
  attachObj = {
    // for response AttachObj(create/edit)
    attachDoc: null,
  };
  claimObj: ReimbursementsDetails = new ReimbursementsDetails(this.attachObj); //primarily for create
  claimNumber: any;
  sapCode: any; // store sapCode in case of edit and create
  lineNoToDelete: string[] = []; //store list of linenumbers to delete if full section is removed in case of edit
  reimbursementStatusKey: string = '';
  attachmentObj: AttachDoc = new AttachDoc([]);
  editClaimObj: ReimbursementsDetails[] = []; //primarily for edit
  counter = 1;
  confirmationMsg: string; // customize msg and store in this field to show anywhere on this component
  isClaimStatusSubmitted: boolean = false;
  isView: boolean;
  displayFiles: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reimbursmentService: ReimbursementsService,
    private messageService: MessageModalService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.monsoonKitFormArray = new FormArray([]);
    this.lineNoToDelete = [];
    this.disableFutureDates();
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
            //billDetails
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

                this.monsoonKitFormArray.push(this.editMonsoonKitForm(editObj));
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
      this.addMonsoonKitForm();
    }
  }

  editMonsoonKitForm(editObj) {
    let viewMode = this.data.payLoad.viewMode;
    let setEditAttach = '';
    if (editObj.attachDoc != 'undefined' && editObj.attachDoc != null) {
      setEditAttach = editObj.attachDoc.fileName;
    }
    this.monsoonKitForm = new FormGroup({
      billNo: new FormControl({ value: editObj.billNumber,disabled: viewMode }, Validators.required),
      billDate: new FormControl(
        { value: new Date(editObj.billDate),disabled: viewMode },
        Validators.required
      ),
      requestedAmount: new FormControl(
        { value: editObj.requestedAmount,disabled: viewMode },
        Validators.required
      ),
      remarks: new FormControl({ value: editObj.remarks,disabled: viewMode }),
      attachment: new FormControl({ value: setEditAttach,disabled: viewMode }, Validators.required),
      lineNo: new FormControl(editObj.lineNumber),
    });

    return this.monsoonKitForm;
  }

  createMonsoonKitForm(counter) {
    this.monsoonKitForm = new FormGroup({
      billNo: new FormControl('', Validators.required),
      billDate: new FormControl('', Validators.required),
      requestedAmount: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      attachment: new FormControl('', Validators.required),
      lineNo: new FormControl('000' + counter),
    });
    return this.monsoonKitForm;
  }

  addMonsoonKitForm() {
    if (this.editClaimObj.length > 0) {
      if (this.counter == 1) {
        let count = this.editClaimObj[this.editClaimObj.length - 1].lineNumber;
        let indexToStartFrom = count.substring(count.length - 1);
        this.counter = parseInt(indexToStartFrom) + 1;
        this.monsoonKitFormArray.push(this.createMonsoonKitForm(this.counter));
      } else {
        this.monsoonKitFormArray.push(this.createMonsoonKitForm(this.counter));
        this.counter++;
      }
    } else {
      this.monsoonKitFormArray.push(this.createMonsoonKitForm(this.counter));
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

  fileBrowseHandler(files, i) {
    this.prepareFilesList(files, i);
  }

  onFileDrops(data, index): void {
    this.prepareFilesList(data.files, index);
  }

  prepareFilesList(files: Array<any>, index) {
    console.log(
      this.monsoonKitFormArray.controls[index]['controls'].attachment.value
    );
    if (files.length > 0) {
      let isFileSizeValid = false;
      let isFileTypeValid = false;
      isFileSizeValid = this.reimbursmentService.isFileSizeValid(files[0]);
      isFileTypeValid = this.reimbursmentService.isFileTypeValid(files[0]);
      console.log(isFileSizeValid);
      console.log(isFileTypeValid);
      this.monsoonKitFormArray.controls[index]['controls'].attachment.value =
        '';
      if (isFileSizeValid == true && isFileTypeValid == true) {
        if (index !== -1 && this.attachedFiles.length > index) {
          this.attachedFiles[index] = files[0];
        } else {
          this.attachedFiles.push(files[0]);
        }

        this.monsoonKitFormArray.controls[index]['controls'].attachment.value =
          files[0].name;
        this.monsoonKitFormArray.controls[index].patchValue({
          attachment: files[0].name,
        });
        this.isFileUploadedValid = false;
        this.disableBtn = false;
      } else {
        console.log('if');
        console.log(
          this.monsoonKitFormArray.controls[index]['controls'].attachment.value
        );
        this.monsoonKitFormArray.controls[index].patchValue({
          attachment: '',
        });
        // this.monsoonKitFormArray.controls[index]['controls'].attachment.value =
        //   '';
        this.isFileUploadedValid = true;
        this.disableBtn = true;
      }
      this.createPayLoad(index, 'addAttachment');
    }
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
    this.attachmentObj.lineNumber = this.monsoonKitFormArray.controls[index][
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
    for (let [index, monsoonObj] of this.monsoonKitFormArray.value.entries()) {
      totalAmt = totalAmt + parseInt(monsoonObj.requestedAmount);
      this.claimObj.attachDoc = null; //case of create
      this.claimObj.billNumber = monsoonObj.billNo;
      this.claimObj.billDate = new Date(monsoonObj.billDate).getTime();
      this.claimObj.billAmount = monsoonObj.requestedAmount;
      this.claimObj.remarks = monsoonObj.remarks;
      this.claimObj.requestedAmount = monsoonObj.requestedAmount;
      this.claimObj.claimNumber = this.claimNumber
        ? this.claimNumber
        : this.addAttachmentKey == 'A'
        ? ' '
        : '';
      // if(this.data.payLoad.setOperation=="Edit" && index < this.editClaimObj.length ){
      //   this.claimObj.lineNumber = this.editClaimObj[index].lineNumber;
      //   } else {
      this.claimObj.lineNumber = monsoonObj.lineNo;
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

  addAttachmentFuctionality(index, totalAmt, opr) {
    this.addAttachmentKey = 'A';
    let lineNumber = this.monsoonKitFormArray.controls[index]['controls'].lineNo
      .value;
    this.claimObj.lineNumber = lineNumber;
    totalAmt =
      totalAmt +
      parseInt(
        this.monsoonKitFormArray.controls[index]['controls'].requestedAmount
          .value
      );
    this.claimObj.attachDoc = null; //case of cremedicalObjate
    this.claimObj.billNumber = this.monsoonKitFormArray.controls[index][
      'controls'
    ].billNo.value;
    this.claimObj.billDate = new Date(
      this.monsoonKitFormArray.controls[index]['controls'].billDate.value
    ).getTime();
    this.claimObj.billAmount = this.monsoonKitFormArray.controls[index][
      'controls'
    ].requestedAmount.value;
    this.claimObj.remarks = this.monsoonKitFormArray.controls[index][
      'controls'
    ].remarks.value;
    this.claimObj.requestedAmount = this.monsoonKitFormArray.controls[index][
      'controls'
    ].requestedAmount.value;
    this.claimObj.claimNumber = this.claimNumber
      ? this.claimNumber
      : this.addAttachmentKey == 'A'
      ? ' '
      : '';

    let claimDetailObj = JSON.parse(JSON.stringify(this.claimObj));
    this.setClaimDetailObj.push(claimDetailObj);
    console.log(this.setClaimDetailObj);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);

    this.hitOperationApi(index, finalPayLoad, opr);
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
    this.monsoonKitFormArray.controls[index].patchValue({
      attachment: '',
    });
    this.monsoonKitFormArray.controls[index]['controls'].attachment.value = '';
    this.attachedFiles[index] = null;
    //     }
    //   }
    // );
  }

  deleteMonsoonKitForm(index) {
    let lineNumber = '';
    lineNumber = this.monsoonKitFormArray.controls[index]['controls'].lineNo
      .value;
    // }
    this.monsoonKitFormArray.removeAt(index);
    // this.editClaimObj.splice(index, 1);
    this.attachedFiles.splice(index, 1);
    this.lineNoToDelete.push(lineNumber);
    this.createPayLoad(index, 'deleteRow');
  }

  onCancelAction() {
    this.dialogRef.close();
  }

  monsoonKitSaveSubmitConfirmation(actionOpr) {
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
      this.monsoonKitFormArray.value
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
