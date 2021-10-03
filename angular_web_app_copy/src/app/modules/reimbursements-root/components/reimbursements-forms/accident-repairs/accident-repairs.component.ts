import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { getYear, getMonth, getDate } from 'date-fns/fp';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import {
  AttachDoc,
  ReimbursementsDetails,
} from '../../../utils/reimbursements.model';

@Component({
  selector: 'app-accident-repairs',
  templateUrl: './accident-repairs.component.html',
  styleUrls: ['./accident-repairs.component.css'],
})
export class AccidentRepairsComponent implements OnInit {
  accidentRepairForm: FormGroup;
  accidentRepFormArray: FormArray;
  disabled: boolean = false;
  setMaxDate: any; //date from which calendar should be disabled
  reimbursementTextTitle: any;
  attachedFiles: any[] = []; //files attached array
  isFileUploadedValid: boolean = false; // check if uploaded file valid or not
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
  accdate: FormControl = new FormControl('', Validators.required);
  reimbursementStatusKey: string = '';
  // filename: string = '';
  addAttachmentKey: string = '';
  confirmationMsg: string; // customize msg and store in this field to show anywhere on this component
  fileSizeLimit: number = 1024 * 1024;
  maxSize = '2mb';
  acceptedFormats = ['.pdf'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reimbursmentService: ReimbursementsService,
    private messageService: MessageModalService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog
  ) {}
  displayFiles: any[] = [];
  ngOnInit(): void {
    this.accidentRepFormArray = new FormArray([]);
    this.accidentRepFormArray.valueChanges.subscribe((data)=>{
      console.log(this.accidentRepFormArray)
    })
    this.disableFutureDates();
    this.lineNoToDelete = [];

    if (this.data.payLoad.setOperation == 'Edit') {
      this.disabled = this.data.payLoad.viewMode;
      var typeDetailPayLoadFromPopup = JSON.parse(
        JSON.stringify(this.data.payLoad.typeDetails)
      );
      this.reimbursementTextTitle = this.data.payLoad.typeDetails.reimbursementTypeKey.value;
      this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;
      this.getclaimhdr(typeDetailPayLoadFromPopup.claimNumber);
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

                this.accidentRepFormArray.push(
                  this.editAccidentRepairsForm(editObj)
                );
                if (editObj.attachDoc) {
                  let obj = {
                    name: editObj.attachDoc.fileName,
                    lineNumber: editObj.attachDoc.lineNumber,
                  };
                  this.displayFiles.push([obj]);
                } else {
                  this.displayFiles.push([]);
                }
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.reimbursementTextTitle = this.data.typeDetails.reimbursementType.value;
      this.sapCode = this.data.typeDetails.reimbursementType.sapCode;
      this.addAccidentRepairForm();
    }
  }

  getclaimhdr(claimNumber) {
    this.reimbursmentService
      .getClaimHeader(claimNumber)
      .subscribe((data: any) => {
        console.log(data);
        if (data.length > 0) {
          this.accdate = new FormControl(
            new Date(data[0].accidentDateNC),
            Validators.required
          );
        }
      });
  }

  editAccidentRepairsForm(editObj) {
    let setEditAttach = '';
    if (editObj.attachDoc != 'undefined' && editObj.attachDoc != null) {
      setEditAttach = editObj.attachDoc.fileName;
    }
    this.accidentRepairForm = new FormGroup({
      // accidentDate: new FormControl(editObj.billNumber, Validators.required),
      billNo: new FormControl(editObj.billNumber, Validators.required),
      billDate: new FormControl(
        new Date(editObj.billDate),
        Validators.required
      ),
      billAmount: new FormControl(editObj.requestedAmount),
      vendorName: new FormControl(editObj.travelMode, Validators.required),
      vehicleNumber: new FormControl(editObj.lcPlaceFrom, Validators.required),
      requestedAmount: new FormControl(
        editObj.requestedAmount,
        Validators.required
      ),
      remarks: new FormControl(editObj.remarks),
      attachment: new FormControl(setEditAttach),
      lineNo: new FormControl(editObj.lineNumber),
    });

    return this.accidentRepairForm;
  }

  createAccidentRepairForm(counter) {
    this.accidentRepairForm = new FormGroup({
      // accidentDate: new FormControl('', Validators.required),
      billNo: new FormControl('', Validators.required),
      billDate: new FormControl('', Validators.required),
      vendorName: new FormControl('', Validators.required),
      vehicleNumber: new FormControl('', Validators.required),
      requestedAmount: new FormControl('', Validators.required),
      billAmount: new FormControl(''),
      remarks: new FormControl(''),
      attachment: new FormControl(''),
      lineNo: new FormControl('000' + counter),
    });
    return this.accidentRepairForm;
  }

  addAccidentRepairForm() {
    if (this.editClaimObj.length > 0) {
      if (this.counter == 1) {
        let count = this.editClaimObj[this.editClaimObj.length - 1].lineNumber;
        let indexToStartFrom = count.substring(count.length - 1);
        this.counter = parseInt(indexToStartFrom) + 1;
        this.accidentRepFormArray.push(
          this.createAccidentRepairForm(this.counter)
        );
      } else {
        this.accidentRepFormArray.push(
          this.createAccidentRepairForm(this.counter)
        );
        this.counter++;
      }
    } else {
      this.accidentRepFormArray.push(
        this.createAccidentRepairForm(this.counter)
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

        this.accidentRepFormArray.controls[index][
          'controls'
        ].attachment.value=files[0].name;
        this.isFileUploadedValid = false;
      } else {
        this.accidentRepFormArray.controls[index][
          'controls'
        ].attachment.value = '';
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

  deleteAttachmentFile(index: number) {
    // this.confirmAttachmentDelete(index);
    this.createPayLoad(index, 'deleteAttachment');
    this.accidentRepFormArray.controls[index][
      'controls'
    ].attachment.value = '';
    this.attachedFiles[index] = null;
  }

  confirmAttachmentDelete(index) {
    this.messageService.showConfirmation(
      'Are you sure you want to delete the selected file?.',
      'Confirmation',
      'confirmation-icon',
      (reason) => {
        if (reason === 'YES') {
          this.createPayLoad(index, 'deleteAttachment');
          this.accidentRepFormArray.controls[index][
            'controls'
          ].attachment.value = '';
          this.attachedFiles[index] = null;
        }
      }
    );
  }

  deleteAccidentRepairForm(index) {
    let lineNumber = '';
    lineNumber = this.accidentRepFormArray.controls[index]['controls'].lineNo
      .value;
    this.accidentRepFormArray.removeAt(index);
    this.attachedFiles.splice(index, 1);
    this.lineNoToDelete.push(lineNumber);
    this.createPayLoad(index, 'deleteRow');
  }

  onCancelAction() {
    this.dialogRef.close();
  }

  addAttachmentFuctionality(index, totalAmt, opr) {
    this.addAttachmentKey = 'A';
    let lineNumber = this.accidentRepFormArray.controls[index]['controls']
      .lineNo.value;
    this.claimObj.lineNumber = lineNumber;
    totalAmt =
      totalAmt +
      parseInt(
        this.accidentRepFormArray.controls[index]['controls'].requestedAmount
          .value
      );
    this.claimObj.attachDoc = null; //case of cremedicalObjate
    this.claimObj.billNumber = this.accidentRepFormArray.controls[index][
      'controls'
    ].billNo.value;
    this.claimObj.billDate = new Date(
      this.accidentRepFormArray.controls[index]['controls'].billDate.value
    ).getTime();
    this.claimObj.billAmount = this.accidentRepFormArray.controls[index][
      'controls'
    ].requestedAmount.value;
    this.claimObj.remarks = this.accidentRepFormArray.controls[index][
      'controls'
    ].remarks.value;
    this.claimObj.requestedAmount = this.accidentRepFormArray.controls[index][
      'controls'
    ].requestedAmount.value;
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
    this.attachmentObj.lineNumber = this.accidentRepFormArray.controls[index][
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
    //todo::::::::::::::::::::::::::::::::Set accident date,vendor name, vehicle number
    let lineNumber = '';
    for (let [index, medicalObj] of this.accidentRepFormArray.value.entries()) {
      totalAmt = totalAmt + parseInt(medicalObj.requestedAmount);
      this.claimObj.attachDoc = null; //case of create
      this.claimObj.billNumber = medicalObj.billNo;
      this.claimObj.billDate = new Date(medicalObj.billDate).getTime();
      this.claimObj.billAmount = medicalObj.requestedAmount;
      this.claimObj.remarks = medicalObj.remarks;
      this.claimObj.travelMode = medicalObj.vendorName;
      this.claimObj.lcPlaceFrom = medicalObj.vehicleNumber;
      this.claimObj.requestedAmount = medicalObj.requestedAmount;
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
    let accidentDate = this.accdate.value;
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
      accidentDateNC: new Date(accidentDate).getTime(),
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

  accidentRepairSaveSubmitConfirmation(actionOpr) {
    if (this.accdate.invalid) {
      console.log('invalid accdent date');
      this.messageService.showMessage(
        'Accidental Date is required!',
        'Error',
        'warning-icon',
        'OK'
      );
      return;
    }
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
      this.accidentRepFormArray.value
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
  /**
   * attachment drag and drop
   */
  subscriptionList: Subscription[] = [];
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
}
