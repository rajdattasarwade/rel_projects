import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material/dialog';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
//import { ChildrenHostelAllowanceModel } from './children-hostel-allowance-model'
import {
  ReimbursementsDetails,
  ReimbursementsTypeDetails,
  AttachDoc
} from '../../../utils/reimbursements.model';
import { getYear, getMonth, getDaysInMonth, getDate } from 'date-fns';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-children-hostel-allowance',
  templateUrl: './children-hostel-allowance.component.html',
  styleUrls: ['./children-hostel-allowance.component.css']
})
export class ChildrenHostelAllowanceComponent implements OnInit {
  childFormGroup: FormGroup;
  form: FormArray;
  reimbursementTextTitle: any; //store reimbursement title
  setMaxDate: any;
  attachedFiles: any[] = [];
  isFileUploadedValid: boolean = false;
  confirmationMsg: string; // customize msg and store in this field to show anywhere on this component
  attachObj = {
    // for response AttachObj(create/edit)
    attachDoc: null
  };

  displayFiles: any[] = [];
  disabled: boolean = false;
  subscriptionList: Subscription[] = [];
  setClaimDetailObj: any = []; //final payload for claimObj
  claimObj: ReimbursementsDetails = new ReimbursementsDetails(this.attachObj);
  attachmentObj: AttachDoc = new AttachDoc([]);
  editClaimObj: ReimbursementsDetails[] = [];
  isView: boolean;

  attachFiles: any = []; //array of files attached
  sapCode: any; // store sapCode in case of edit and create
  lineNoToDelete: string[] = []; //store list of linenumbers to delete if full section is removed in case of edit
  counter = 1;
  claimNumber: any;
  reimbursementStatusKey: string = '';

  fxFlexColumn: number;
  reimbursementType = 'Children Hostel Allowance';
  list = [];
  Local: string;
  IsmodelShow: boolean;
  rembTypeDetails: any;

  childrenHostelGroup: FormGroup;
  parentForm: string;
  parentValue: any;
  obj = {
    attachDoc: null
  };

  billDetailsData: ReimbursementsDetails[] = [];
  @Input() public typeDetails;
  tempDeleteForm: string[] = [];
  claimDetails: any;
  addAttachmentKey: string = '';
  typetext: any;
  setClaimDetail: any = [];
  buttonText: string = 'ATTACH';

  draft: string = 'draft';
  submit: string = 'submit';
  validFile: boolean = false;
  addedFormBills: any[] = [];
  requestNumberNC: any;
  baseFormDetails: any;
  
  lineNumberDupli: any = [];
  reimburseStatusKey: any;

  memberList = [];
  // childFormGroup: FormGroup;

  @ViewChild('fileDropRef') fileDropRef;
  files: any = [];
  payload: any;
  // billDetails: ChildrenHostelAllowanceModel = new ChildrenHostelAllowanceModel();
  // billDetailsData: ChildrenHostelAllowanceModel[] = [];

  guestCallback: () => {};

  constructor(
    private reimbursmentService: ReimbursementsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private messageService: MessageModalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    
    this.form = new FormArray([]);
    this.disableFutureDates();
    this.lineNoToDelete = [];
    if (this.data.payLoad.setOperation == 'Edit') {
      this.reimbursementStatusKey = this.data.payLoad.typeDetails.statusKey;

      this.isView = this.data.payLoad.viewMode;

      this.reimbursementStatusKey=this.data.payLoad.typeDetails.statusKey

      this.disabled=this.data.payLoad.viewMode
      var typeDetailPayLoadFromPopup = JSON.parse(
        JSON.stringify(this.data.payLoad.typeDetails)
    );
    
    this.reimbursementTextTitle = this.data.payLoad.typeDetails.reimbursementTypeKey.value;
    this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;
      // this.disabled = this.data.payLoad.viewMode;
      // var typeDetailPayLoadFromPopup = JSON.parse(
      //   JSON.stringify(this.data.payLoad.typeDetails)
      // );
      // this.reimbursementTextTitle = this.data.payLoad.typeDetails.reimbursementTypeKey.value;
      // this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;

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
                    lineNumber: editObj.attachDoc.lineNumber
                  };
                  this.displayFiles.push([obj]);
                } else {
                  this.displayFiles.push([]);
                }

                this.form.push(this.editAviationMedicalForm(editObj));
              }
            }
          },
          err => {
            console.log(err);
          }
        );
    } else {
      this.sapCode = this.data.typeDetails.reimbursementType.sapCode;
      this.reimbursementTextTitle = this.data.typeDetails.reimbursementType.value;
      this.addChildrenHostelForm();
    }
    this.getReimbursementType();
    this.getClaimValue();
    this.getFamily();
  }

  disableFutureDates() {
    let year = getYear(new Date());
    let month = getMonth(new Date()) + 1;
    let todayDate = getDate(new Date());
    let endMonthValidationDt = year + ',' + month + ',' + todayDate;
    this.setMaxDate = new Date(endMonthValidationDt);
  }

  headerClaimDetails() {
    this.reimbursmentService
      .getClaimHeader(this.claimDetails.claimNumber)
      .subscribe(
        data => {
          this.baseFormDetails = data[0];
          this.requestNumberNC = this.baseFormDetails.requestNumberNC;
        },
        err => {
          console.log(err);
        }
      );
  }

  addAttachmentFuctionality(index, totalAmt, opr) {
    this.claimObj.remarks = this.form.controls[index]['controls'].remarks.value;
    this.claimObj.childName = this.form.controls[index][
      'controls'
    ].childName.value;
    this.claimObj.billNumber = this.form.controls[index][
      'controls'
    ].billNo.value;
    this.claimObj.requestedAmount = this.form.controls[index][
      'controls'
    ].requestedAmt.value;
    this.claimObj.billDate = new Date(
      this.form.controls[index]['controls'].billDate.value
    ).getTime();

    this.claimObj.billAmount = this.form.controls[index][
      'controls'
    ].requestedAmt.value;
    this.claimObj.attachDoc = null;
    let lineNumber = this.form.controls[index]['controls'].lineNo.value;
    this.claimObj.lineNumber = lineNumber;

    this.claimObj.claimNumber = this.claimNumber
      ? this.claimNumber
      : this.addAttachmentKey == 'A'
      ? ' '
      : '';
    this.claimObj.reimbursementType = this.sapCode;
    let claimDetailObj = JSON.parse(JSON.stringify(this.claimObj));
    this.setClaimDetailObj.push(claimDetailObj);
    console.log(this.setClaimDetailObj);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);
    this.hitOperationApi(index, finalPayLoad, opr);
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
      requestNumberNC: ''
    };
    console.log(payload);
    return payload;
  }

  deleteAttachmentFile(index: number) {
    this.confirmAttachmentDelete(index);
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
          err => {
            console.log(err);
          }
        );
    } else if (opr == 'deleteAttachment') {
      this.reimbursmentService.deleteAttachment(payload).subscribe(
        (data: any) => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
    } else if (opr == 'deleteRow') {
      this.reimbursmentService.deleteRows(payload).subscribe(
        (data: any) => {
          console.log(data);
          this.lineNoToDelete = [];
        },
        err => {
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

  deleteAttachmentFunctionality(index, opr) {
    this.attachmentObj.fileName = this.attachedFiles[index].name;
    // this.attachmentObj.fileName = this.filename;
    this.attachmentObj.reimbursementType = this.sapCode;
    this.attachmentObj.fileType = '.pdf';
    this.attachmentObj.deleteFlag = false;
    // if(this.data.payLoad.setOperation=="Edit" && index < this.editClaimObj.length ){
    //   this.attachmentObj.lineNumber = this.editClaimObj[index].lineNumber;
    //   } else {
    // if(this.medicalFormArray.controls[index] != undefined){
    this.attachmentObj.lineNumber = this.form.controls[index][
      'controls'
    ].lineNo.value;

    // }else{
    //   this.attachmentObj.lineNumber = this.lineNoToDelete[0];
    //   this.lineNoToDelete = [];
    // }

    // }
    // this.attachmentObj.lineNumber = '000' + (index + 1);
    let claimDetailObj = JSON.parse(JSON.stringify(this.attachmentObj));
    this.hitOperationApi(index, claimDetailObj, opr);
  }


  
    
  editAviationMedicalForm(editObj) {
    let viewMode = this.data.payLoad.viewMode;

    
    let setEditAttach = '';
    if (editObj.attachDoc != 'undefined' && editObj.attachDoc != null) {
      setEditAttach = editObj.attachDoc.fileName;
    }

    this.childFormGroup = new FormGroup({
      billDate: new FormControl({
        value: new Date(editObj.billDate),
        disabled: viewMode},
        Validators.required
      ),


    billNo: new FormControl({value:editObj.billNumber,disabled: viewMode},
      Validators.required),

      childName: new FormControl({value: editObj.childName,disabled: viewMode}, Validators.required),
   
      requestedAmt: new FormControl({value: editObj.requestedAmount,disabled: viewMode}, Validators.required),

      remarks: new FormControl({value:editObj.remarks,disabled: viewMode}),
      // childName: new FormControl(editObj.childName, Validators.required),
      // billNo: new FormControl(editObj.billNumber, Validators.required),

      // billDate: new FormControl(
      //   new Date(editObj.billDate),
      //   Validators.required
      // ),

      // requestedAmt: new FormControl(
      //   editObj.requestedAmount,
      //   Validators.required
      // ),
      // remarks: new FormControl(editObj.remarks),
      attachment: new FormControl(setEditAttach),
      lineNo: new FormControl(editObj.lineNumber)
    });

    return this.childFormGroup;
  }

  getReimbursementType() {
    this.reimbursmentService.getEligibility().subscribe(data => {
      let a = data;
      for (let i = 0; i < a.length; i++) {
        if (
          a[i].reimbursementType.sapCode != '' &&
          a[i].reimbursementType.value != ''
        ) {
          this.list.push(a[i].reimbursementType);
        }
        console.log(this.list);
      }
      this.Local = 'SCHA';
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
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
        lineNo: this.attachedFiles[index].lineNumber
      };
      this.subscriptionList.push(
        this.reimbursmentService.openAttachment(obj).subscribe(
          (data: any) => {
            if (data) {
              this.onViewPdf(data, name);
            }
          },
          error => {
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

  addChildrenHostelForm() {
    if (this.editClaimObj.length > 0) {
      if (this.counter == 1) {
        let count = this.editClaimObj[this.editClaimObj.length - 1].lineNumber;
        let indexToStartFrom = count.substring(count.length - 1);
        this.counter = parseInt(indexToStartFrom) + 1;
        this.form.push(this.createGroup(this.counter));
      } else {
        this.form.push(this.createGroup(this.counter));
        this.counter++;
      }
    } else {
      this.form.push(this.createGroup(this.counter));
      this.counter++;
    }
  }

  //Fetching List of Family members
  getFamily() {
    this.reimbursmentService
      .getDropDownsForReimbursement('SCHA')
      .subscribe(data => {
        let member = data;
        for (let i = 0; i < member.CHILD_NAME.length; i++) {
          if (
            member.CHILD_NAME[i].code != '' &&
            member.CHILD_NAME[i].value != ''
          ) {
            this.memberList.push(member.CHILD_NAME[i]);
          }
        }
      });
  }

  //On-Click-Of-Add-Button

  onCancel(): void {
    this.dialogRef.close();
  }
  createGroup(counter) {
    this.childFormGroup = new FormGroup({
      childName: new FormControl('', Validators.required),
      billNo: new FormControl('', Validators.required),
      billDate: new FormControl('', Validators.required),
      requestedAmt: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      attachment: new FormControl(''),
      hasAttached: new FormControl(false),
      lineNo: new FormControl('000' + counter)
    });
    return this.childFormGroup;
  }

  getClaimValue() {
    this.reimbursmentService.getEligibility().subscribe(
      data => {
        if (data.length > 0) {
          for (let item of data) {
            if (item.reimbursementType.sapCode == 'SCHA') {
              this.rembTypeDetails = item;
            }
          }
          console.log(this.rembTypeDetails);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  //FIle Handler
  fileBrowseHandler(files, i) {
    this.prepareFilesList(files, i);
  }

  //deleteForm(index) {
  //this.form.removeAt(index);
  //this.files.splice(index, 1);
  //}

  removeFile(event, index) {
    this.messageService.showConfirmation(
      'Are you sure you want to delete the selected file?.',
      'Confirmation',
      'confirmation-icon',
      reason => {
        if (reason === 'YES') {
          // this.form.controls[index]['controls'].editAtach.value = '';
          this.form.controls[index]['controls'].attachment.value = '';
          this.form.controls[index]['controls'].hasAttached.value = false;
          this.files.splice(index, 1);
        }
      }
    );
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

        this.form.controls[index]['controls'].attachment.value = files[0].name;
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

      this.claimObj.childName = medicalObj.childName;
      this.claimObj.attachDoc = null; //case of create
      this.claimObj.billNumber = medicalObj.billNo;
      this.claimObj.billDate = new Date(medicalObj.billDate).getTime();
      this.claimObj.billAmount = medicalObj.requestedAmt;
      this.claimObj.remarks = medicalObj.remarks;
      this.claimObj.requestedAmount = medicalObj.requestedAmt;

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
    this.hitOperationApi(0, finalPayLoad, opr);
  }

  confirmAttachmentDelete(index) {
    
          this.createPayLoad(index, 'deleteAttachment');
          this.form.controls[index]['controls'].attachment.value = '';
          // if (index < this.editClaimObj.length) {
          //   this.editClaimObj[index].attachDoc.deleteFlag = true;
          // }
          this.attachedFiles[index] = null;
     
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
        reason => {
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

  deleteForm(index) {
    let lineNumber = '';
    // if(this.data.payLoad.setOperation=="Edit" && index < this.editClaimObj.length ){
    //   lineNumber = this.editClaimObj[index].lineNumber;
    //   } else {
    lineNumber = this.form.controls[index]['controls'].lineNo.value;
    // }
    this.form.removeAt(index);
    // this.editClaimObj.splice(index, 1);
    this.attachedFiles.splice(index, 1);
    this.lineNoToDelete.push(lineNumber);
    this.createPayLoad(index, 'deleteRow');
  }
}
