import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import { getYear, getMonth, getDate } from 'date-fns/fp';
import {
  AttachDoc,
  ReimbursementsDetails,
} from '../../../utils/reimbursements.model';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-office-wear-alloance',
  templateUrl: './office-wear-alloance.component.html',
  styleUrls: ['./office-wear-alloance.component.css'],
})
export class OfficeWearAlloanceComponent implements OnInit, OnDestroy {
  officeWearForm: FormGroup;
  officeWearFormArray: FormArray;
  setMaxDate: any; //date from which calendar should be disabled
  reimbursementTextTitle: any;
  attachedFiles: any[] = []; //files attached array
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
  statusText: boolean = false;
  subscriptionList: Subscription[] = [];
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
    this.officeWearFormArray = new FormArray([]);
    this.disableFutureDates();
    this.lineNoToDelete = [];
    if (this.data.payLoad.setOperation == 'Edit') {
      var typeDetailPayLoadFromPopup = JSON.parse(
        JSON.stringify(this.data.payLoad.typeDetails)
      );
      this.isView = this.data.payLoad.viewMode;
      this.statusText =  this.data.payLoad.typeDetails.statusText.includes('Saved') ? true : false;
      this.reimbursementTextTitle = this.data.payLoad.typeDetails.reimbursementTypeKey.value;
      this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;
      this.subscriptionList.push(
        this.reimbursmentService
        .getClaimBills(typeDetailPayLoadFromPopup.claimNumber)
        .subscribe(
          (data: ReimbursementsDetails[]) => {
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
                this.officeWearFormArray.push(
                  this.editOfficeWearForm(editObj)
                );
              }
            }
          },
          err => {
            console.log(err);
          }
        )
      );
    } else {
      this.statusText = false;
      this.reimbursementTextTitle = this.data.typeDetails.reimbursementType.value;
      this.sapCode = this.data.typeDetails.reimbursementType.sapCode;
      this.addOfficeWearForm();
    }
  }

  editOfficeWearForm(editObj) {
    let setEditAttach = '';
    if (editObj.attachDoc != 'undefined' && editObj.attachDoc != null) {
      setEditAttach = editObj.attachDoc.fileName;
    }
    this.officeWearForm = new FormGroup({
      billType: new FormControl({value: editObj.withoutBill, disabled: this.isView}, Validators.required),
      billNo: new FormControl({value:editObj.billNumber, disabled: this.isView}, Validators.required),
      billDate: new FormControl(
        {value:new Date(editObj.billDate), disabled: this.isView},
        Validators.required
      ),
      billAmount: new FormControl(
        {value:editObj.requestedAmount, disabled: this.isView},
        Validators.required
      ),
      remarks: new FormControl({value:editObj.remarks, disabled: this.isView}), 
      attachment: new FormControl(setEditAttach),
      lineNo: new FormControl(editObj.lineNumber),
    });

    return this.officeWearForm;
  }

  createOfficeWearForm(counter) {
    this.officeWearForm = new FormGroup({
      billType: new FormControl('', Validators.required),
      billNo: new FormControl('', Validators.required),
      billDate: new FormControl('', Validators.required),
      billAmount: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      attachment: new FormControl('',),
      lineNo: new FormControl('000' + counter),
    });
    return this.officeWearForm;
  }

  addOfficeWearForm() {
    if (this.editClaimObj.length > 0) {
      if (this.counter == 1) {
        let count = this.editClaimObj[this.editClaimObj.length - 1].lineNumber;
        let indexToStartFrom = count.substring(count.length - 1);
        this.counter = parseInt(indexToStartFrom) + 1;
        this.officeWearFormArray.push(this.createOfficeWearForm(this.counter));
      } else {
        this.officeWearFormArray.push(this.createOfficeWearForm(this.counter));
        this.counter++;
      }
    } else {
      this.officeWearFormArray.push(this.createOfficeWearForm(this.counter));
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

  prepareFilesList(files: Array<any>, index) {
    if (files.length > 0) {
        if (index !== -1 && this.attachedFiles.length > index) {
          this.attachedFiles[index] = files[0];
        } else {
          this.attachedFiles.push(files[0]);
        }

        this.officeWearFormArray.controls[index]['controls'].attachment.value =
          files[0].name;
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
    let lineNumber = this.officeWearFormArray.controls[index]['controls'].lineNo.value;
    this.claimObj.lineNumber = lineNumber;
    totalAmt =
      totalAmt +
      parseInt(this.officeWearFormArray.controls[index]['controls'].billAmount.value);
    this.claimObj.attachDoc = null; //case of cremedicalObjate
    this.claimObj.billNumber = this.officeWearFormArray.controls[index]['controls'].billNo.value;
    this.claimObj.billDate = new Date(
      this.officeWearFormArray.controls[index]['controls'].billDate.value
    ).getTime();
    this.claimObj.billAmount = this.officeWearFormArray.controls[index]['controls'].billAmount.value;
    this.claimObj.remarks = this.officeWearFormArray.controls[index]['controls'].remarks.value;
    this.claimObj.requestedAmount = this.officeWearFormArray.controls[index]['controls'].billAmount.value;
    this.claimObj.claimNumber = this.claimNumber
      ? this.claimNumber
      : this.addAttachmentKey == 'A'
      ? ' '
      : '';      
    this.claimObj.withoutBill = this.officeWearFormArray.controls[index]['controls'].billType.value;
    let claimDetailObj = JSON.parse(JSON.stringify(this.claimObj));
    this.setClaimDetailObj.push(claimDetailObj);
    console.log(this.setClaimDetailObj);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);

    this.hitOperationApi(index, finalPayLoad, opr);
  }

  deleteAttachmentFunctionality(index, opr) {
    this.attachmentObj.fileName = this.attachedFiles[index].name;
    this.attachmentObj.claimNumber = this.claimNumber;
    this.attachmentObj.reimbursementType = this.sapCode;
    this.attachmentObj.fileType = '.pdf';
    this.attachmentObj.deleteFlag = false;
    this.attachmentObj.lineNumber = this.officeWearFormArray.controls[index]['controls'].lineNo.value;
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
    //todo:::::::::::::::::::::::::::::;;;bind bill type
    let lineNumber = '';
    for (let [index, medicalObj] of this.officeWearFormArray.value.entries()) {
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
      this.claimObj.withoutBill = medicalObj.billType;
      this.claimObj.lineNumber = medicalObj.lineNo;

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
            console.log(data);
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
          console.log(data);
          if (data.responseStatus == 'FAILED') {
            this.messageService.showMessage(
              data.systemErrMsg,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          } else {
            let obj = JSON.parse(data.responseData);
            this.messageService.showMessage(
              obj.message,
              'Success',
              'success-icon',
              'CLOSE'
            );
            this.dialogRef.close('success');
          }
        })
      );
    } else {
      //do nothimg
    }
  }

  deleteAttachmentFile(data: any,index: number): void {
    this.confirmAttachmentDelete(index);
  }

  confirmAttachmentDelete(index) {
    this.createPayLoad(index, 'deleteAttachment');
    this.officeWearFormArray.controls[index]['controls'].attachment.value ='';
    this.attachedFiles[index] = null;
  }

  deleteOfficeWearForm(index) {
    let lineNumber = '';
    lineNumber = this.officeWearFormArray.controls[index]['controls'].lineNo
      .value;
    this.officeWearFormArray.removeAt(index);
    this.displayFiles[index] = [];
    this.attachedFiles.splice(index, 1);
    this.lineNoToDelete.push(lineNumber);
    this.createPayLoad(index, 'deleteRow');
  }

  onCancelAction() {
    this.dialogRef.close();
  }

  officeWearSaveSubmitConfirmation(actionOpr) {
    let isDuplicateValPresent = this.checkIfDuplicateEntryPresent();
    if (!isDuplicateValPresent) {
      if (actionOpr == 'draft') {
        this.reimbursementStatusKey = 'N';
        this.confirmationMsg = 'Do you want to Save as Draft?';
      } else {
        this.reimbursementStatusKey = 'T';
        this.confirmationMsg = 
          'Do you want to save?';
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
      this.officeWearFormArray.value
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;    
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onFileDrops(data, index): void {        
    this.prepareFilesList(data.files, index);
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
