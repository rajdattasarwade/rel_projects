import { Component, OnInit, ViewEncapsulation, Inject, Input, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { getYear, getMonth, getDaysInMonth, getDate } from 'date-fns';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import {
  AttachDoc,
  ReimbursementsDetails,
} from '../../../utils/reimbursements.model';

import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-local-conveyance',
  templateUrl: './local-conveyance.component.html',
  styleUrls: ['./local-conveyance.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LocalConveyanceComponent implements OnInit {
  childFormGroup: FormGroup;   // Form-Group
  form: FormArray;             // Form-Array
  reimbursementTextTitle: any; // reimbursement title
  setMaxDate: any;
  attachedFiles: any[] = [];
  isFileUploadedValid: boolean = false;
  confirmationMsg: string;
  attachObj = {
    attachDoc: null,
  };
  claimObj: ReimbursementsDetails = new ReimbursementsDetails(this.attachObj);
  attachmentObj: AttachDoc = new AttachDoc([]);
  editClaimObj: ReimbursementsDetails[] = [];
  attachFiles: any = []; //Array-Files-Attached
  sapCode: any; // sapCode in case of edit and create
  lineNoToDelete: string[] = []; //store list of linenumbers to delete if full section is removed in case of edit
  counter = 1;
  claimNumber: any;
  reimbursementStatusKey: string = '';
  setClaimDetailObj: any = []; //final payload for claimObj
  vehicleList = [];
  //new
  disabled: boolean = false;  
  displayFiles: any[] = [];
  subscriptionList: Subscription[] = [];
  isView: boolean;


  @ViewChild("fileDropRef") fileDropRef;
  constructor(
    private reimbursmentService: ReimbursementsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private messageService: MessageModalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = new FormArray([]);
    this.disableFutureDates();
    this.lineNoToDelete = [];
    if (this.data.payLoad.setOperation == 'Edit') {
      this.disabled = this.data.payLoad.viewMode;
      this.isView = this.data.payLoad.viewMode;
      var typeDetailPayLoadFromPopup = JSON.parse(
        JSON.stringify(this.data.payLoad.typeDetails)
      );
      this.reimbursementTextTitle = this.data.payLoad.typeDetails.reimbursementTypeKey.value;
      this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;
      this.reimbursmentService
        .getClaimBills(typeDetailPayLoadFromPopup.claimNumber)
        .subscribe(
          (data: ReimbursementsDetails[]) => {
            this.editClaimObj = data;

            if (this.editClaimObj.length) {
              for (let editObj of this.editClaimObj) {
                this.claimNumber = this.editClaimObj[0].claimNumber;
                this.attachedFiles.push(editObj.attachDoc);


                if (editObj.attachDoc) { 
                  let obj = { name: editObj.attachDoc.fileName, lineNumber: editObj.attachDoc.lineNumber }              
                  this.displayFiles.push([obj]); } 
                  else { this.displayFiles.push([]); 
                  }

                this.form.push(
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
      this.sapCode = this.data.typeDetails.reimbursementType.sapCode;
      this.reimbursementTextTitle = this.data.typeDetails.reimbursementType.value;
      this.addLocalConveyanceForm();
    }
    // this.getReimbursementType();
    this.getTravelMode();
  }

  createGroup(counter) {
    this.childFormGroup = new FormGroup({
      traDate: new FormControl("", Validators.required),
      vehList: new FormControl("", Validators.required),
      fromPlace: new FormControl("", Validators.required),
      toPlace: new FormControl("", Validators.required),
      kmTravelled: new FormControl("", Validators.required),
      requestedAmt: new FormControl("", Validators.required),
      remarks: new FormControl(""),
      attachment: new FormControl(""),
      lineNo: new FormControl('000' + counter),
    });
    return this.childFormGroup;
  }


  addLocalConveyanceForm() {
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
    console.log(editObj);
    let setEditAttach = "";
    if (editObj.attachDoc != 'undefined' && editObj.attachDoc != null) {
      setEditAttach = editObj.attachDoc.fileName;
    }
    this.childFormGroup = new FormGroup({
      traDate: new FormControl({
        value: new Date(editObj.travelDate),
        disabled: viewMode
      },        
      Validators.required),

      vehList: new FormControl({  
        value: editObj.otherReimbursementType,
        disabled: viewMode
      },
      Validators.required),

      fromPlace: new FormControl({
       value: editObj.lcPlaceFrom,disabled: viewMode}, Validators.required),

      toPlace: new FormControl({value:editObj.lcPlaceTo,disabled: viewMode}, 
      Validators.required),

      kmTravelled: new FormControl({value : parseInt(editObj.distance),disabled: viewMode},
      Validators.required),

      requestedAmt: new FormControl({value:editObj.requestedAmount,disabled: viewMode },
      Validators.required),

      remarks: new FormControl({value:editObj.remarks, disabled: viewMode }),

      attachment: new FormControl(setEditAttach),
      lineNo: new FormControl(editObj.lineNumber)

    });
    return this.childFormGroup;
  }

  //FIle Handler
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
    totalAmt =
      totalAmt +
      parseInt(
        this.form.controls[index]['controls'].requestedAmt.value
      );

    this.claimObj.travelDate = new Date(this.form.controls[index]['controls'].traDate.value).getTime();
    this.claimObj.travelMode = this.form.controls[index]['controls'].vehList.value;
    this.claimObj.ltaPlaceFrom = this.form.controls[index]['controls'].fromPlace.value;
    this.claimObj.ltaPlaceTo = this.form.controls[index]['controls'].toPlace.value;
    this.claimObj.distance = this.form.controls[index]['controls'].kmTravelled.value;
    this.claimObj.requestedAmount = this.form.controls[index]['controls'].requestedAmt.value;
    this.claimObj.remarks = this.form.controls[index]['controls'].remarks.value;
    let lineNumber = this.form.controls[index]['controls'].lineNo.value;
    this.claimObj.lineNumber = lineNumber;
    this.claimObj.attachDoc = null;
    let claimDetailObj = JSON.parse(JSON.stringify(this.claimObj));
    this.setClaimDetailObj.push(claimDetailObj);
    console.log(this.setClaimDetailObj);

    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);
    this.hitOperationApi(index, finalPayLoad, opr);

  }

  deleteAttachmentFunctionality(index, opr) {
    this.attachmentObj.fileName = this.attachedFiles[index].name;
    this.attachmentObj.reimbursementType = this.sapCode;
    this.attachmentObj.fileType = '.pdf';
    this.attachmentObj.deleteFlag = true;
    this.attachmentObj.lineNumber = this.form.controls[index][
      'controls'
    ].lineNo.value;
    let claimDetailObj = JSON.parse(JSON.stringify(this.attachmentObj));
    this.hitOperationApi(index, claimDetailObj, opr);
    console.log(this.setClaimDetailObj);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);
    this.hitOperationApi(index, finalPayLoad, opr);
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
      totalAmt = totalAmt + parseInt(medicalObj.requestedAmt);
      this.claimObj.attachDoc = null; //case of create      
      this.claimObj.travelDate = new Date(medicalObj.traDate).getTime();
      // this.claimObj.ltaPlaceFrom = medicalObj.fromPlace;
      // this.claimObj.ltaPlaceTo = medicalObj.toPlace;
      this.claimObj.distance = medicalObj.kmTravelled;
      this.claimObj.travelMode = medicalObj.vehList;
      this.claimObj.billAmount = medicalObj.requestedAmt;
      this.claimObj.remarks = medicalObj.remarks;
      this.claimObj.requestedAmount = medicalObj.requestedAmt;
      this.claimObj.lineNumber = medicalObj.lineNo;
      this.claimObj.lcPlaceFrom = medicalObj.fromPlace;
      this.claimObj.lcPlaceTo = medicalObj.toPlace;
      this.claimObj.reimbursementType = this.sapCode;
      this.claimObj.billNumberNC = medicalObj.kmTravelled;
      this.claimObj.otherReimbursementType = medicalObj.vehList;

      let claimDetailObj = JSON.parse(JSON.stringify(this.claimObj));
      this.setClaimDetailObj.push(claimDetailObj);
      console.log(this.setClaimDetailObj);
    }
    var finalPayLoad = this.createFinalPayLoad(
      this.setClaimDetailObj,
      totalAmt
    );
    this.hitOperationApi(0, finalPayLoad, opr);
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

  deleteAttachmentFile(index: number) {
    this.confirmAttachmentDelete(index);
  }

  //Delete-Popup 
  confirmAttachmentDelete(index) {
    this.createPayLoad(index, 'deleteAttachment');
    this.form.controls[index]['controls'].attachment.value =
            '';
    this.attachedFiles[index] = null;
  }

  deleteForm(index) {
    let lineNumber = '';
    lineNumber = this.form.controls[index]['controls'].lineNo.value;
    this.form.removeAt(index);
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


  guestNumericValidation(event, index, grp) {
    let bankNumericVal = this.reimbursmentService.spacevalidation(event);
    if (bankNumericVal) {
      let inputVal = event.target.value.slice(1, -1);
      grp.get(event.target.name).patchValue(inputVal);
    } else {
      if (this.reimbursmentService.setNumeric(event.target.value)) {
        let inputVal = event.target.value.slice(0, -1);
        grp.get(event.target.name).patchValue(inputVal);
      }
    }
  }


  //Fetching List of Travel-Modes
  getTravelMode() {
    this.reimbursmentService
      .getDropDownsForReimbursement('ZCNV')
      .subscribe(data => {
        let vehicle = data;
        for (let i = 0; i < vehicle.TYPE_OF_EXPENSE.length; i++) {
          if (
            vehicle.TYPE_OF_EXPENSE[i].code != '' &&
            vehicle.TYPE_OF_EXPENSE[i].value != ''
          ) {
            debugger;
            this.vehicleList.push(vehicle.TYPE_OF_EXPENSE[i]);
          }
        }
      });
  }

  //On Closure
  onNoClick(): void {
    this.dialogRef.close();
  }

  //New Methoods
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

}

