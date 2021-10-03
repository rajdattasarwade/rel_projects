import {
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Input
} from '@angular/core';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import {
  AttachDoc,
  ReimbursementsDetails
} from '../../../utils/reimbursements.model';
import { getMonth, getYear, getDate } from 'date-fns/esm';
import { PdfViewerModalComponent } from '../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-children-education-allowance',
  templateUrl: './children-education-allowance.component.html',
  styleUrls: ['./children-education-allowance.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class childrenEducationAllowanceComponent implements OnInit {
  form: FormArray;
  parentForm: string;
  parentValue: any;
  obj = {
    attachDoc: null
  };
  payload: any;
  billDetails: ReimbursementsDetails = new ReimbursementsDetails(this.obj);
  billDetailsData: ReimbursementsDetails[] = [];
  attachmentGTObj: AttachDoc = new AttachDoc([]);
  @Input() public typeDetails;
  tempDeleteForm: string[] = [];
  claimDetails: any;
  member: any = [];
  sapCode: any;
  typetext: any;
  setClaimDetail: any = [];
  buttonText: string = 'ATTACH';
  attachFiles: any[] = [];
  disableBtn: boolean = true;
  draft: string = 'draft';
  submit: string = 'submit';
  validFile: boolean = false;
  addedFormBills: any[] = [];
  requestNumberNC: any;
  baseFormDetails: any;
  claimNumber: any;
  displayFiles: any[] = [];
  lineNumberDupli: any = [];
  //reimburseStatusKey:any;
  childFormGroup: FormGroup;
  guestCallback: () => {};
  setMaxDate: any;
  @ViewChild('fileDropRef') fileDropRef;
  counter = 1;
  lineNoToDelete: string[] = [];
  reimbursementStatusKey: string = '';
  addAttachmentKey: string = '';
  subscriptionList: Subscription[] = [];
  statusText: boolean = false;
  isView: boolean;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reimbursmentService: ReimbursementsService,
    private messageService: MessageModalService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tempDeleteForm = [];
    let year = getYear(new Date());
    let month = getMonth(new Date()) + 1;
    let todayDay = getDate(new Date());
    let endMonthValidationDt = year + ',' + month + ',' + todayDay;
    this.setMaxDate = new Date(endMonthValidationDt);
    this.familyMember();
    this.form = new FormArray([]);

    if (this.data.payLoad.setOperation == 'Edit') {
      //call claim details
      console.log('Details===>', this.data);
      this.isView = this.data.payLoad.viewMode;
      this.claimDetails = JSON.parse(
        JSON.stringify(this.data.payLoad.typeDetails)
      );
      if (this.data.payLoad.typeDetails.statusText.includes('Saved')) {
        this.statusText = true;
      } else {
        this.statusText = false;
      }
      this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;
      this.typetext = this.data.payLoad.typeDetails.reimbursementTypeKey.value;
      this.headerClaimDetails();
      this.reimbursmentService
        .getClaimBills(this.claimDetails.claimNumber)
        .subscribe(
          (data: ReimbursementsDetails[]) => {
            //billDetails
            this.billDetailsData = data;
            if (this.billDetailsData.length) {
              // this.claimNumber = this.billDetailsData[0].claimNumber;
              for (let editObj of this.billDetailsData) {
                this.claimNumber = this.billDetailsData[0].claimNumber;
                this.attachFiles.push(editObj.attachDoc);
                // this.form.push(this.editGroup(editObj));
                if (editObj.attachDoc) {
                  let obj = {
                    name: editObj.attachDoc.fileName,
                    lineNumber: editObj.attachDoc.lineNumber
                  };
                  this.displayFiles.push([obj]);
                } else {
                  this.displayFiles.push([]);
                }
                this.form.push(this.editGroup(editObj));
              }
            }
          },
          err => {
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
  deleteAttachmentFile(data: any, index: number): void {
    this.confirmDelete(index);
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

  validForm(formGroupObj) {
    this.parentForm = formGroupObj.status;
    this.parentValue = formGroupObj.value;
    console.log('status', this.parentForm);
  }

  familyMember() {
    this.reimbursmentService.getDropDownsForReimbursement('SCEA').subscribe(
      data => {
        data['CHILD_NAME'] = data['CHILD_NAME'].filter(
          item => item.code !== 'ZISPACE'
        );
        this.member = data['CHILD_NAME'];
      },
      err => {
        console.log(err);
      }
    );
  }

  createGroup(counter) {
    this.childFormGroup = new FormGroup({
      familyMember: new FormControl('', Validators.required),
      billNo: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      billDate: new FormControl('', Validators.required),
      requestedAmt: new FormControl('', [
        Validators.required,
        Validators.maxLength(13)
      ]),
      remarks: new FormControl('', [Validators.maxLength(200)]),
      attachment: new FormControl(''),
      lineNo: new FormControl('000' + counter)
    });

    return this.childFormGroup;
  }

  addForm() {
    if (this.billDetailsData.length > 0) {
      if (this.counter == 1) {
        let count = this.billDetailsData[this.billDetailsData.length - 1]
          .lineNumber;
        let indexToStartFrom = count.substring(count.length - 1);
        this.counter = parseInt(indexToStartFrom) + 1;
        this.form.push(this.createGroup(this.counter));
        this.counter++;
      } else {
        this.form.push(this.createGroup(this.counter));
      }
    } else {
      this.form.push(this.createGroup(this.counter));
      this.counter++;
    }
  }

  editGroup(editObj) {
    let viewMode = this.data.payLoad.viewMode;
    let sethasAttach = false;
    let setEditAttach = '';
    if (editObj.attachDoc != 'undefined' && editObj.attachDoc != null) {
      setEditAttach = editObj.attachDoc.fileName;
    }
    let timeStmTobillDate = new Date(editObj.billDate);
    this.childFormGroup = new FormGroup({
      familyMember: new FormControl(
        { value: editObj.childName, disabled: viewMode },
        Validators.required
      ),
      billNo: new FormControl(
        { value: editObj.billNumber, disabled: viewMode },
        Validators.required
      ),
      billDate: new FormControl(
        { value: timeStmTobillDate, disabled: viewMode },
        Validators.required
      ),
      requestedAmt: new FormControl(
        { value: editObj.requestedAmount, disabled: viewMode },
        Validators.required
      ),
      remarks: new FormControl({
        value: editObj.remarks,
        disabled: viewMode
      }),
      // familyMember: new FormControl(editObj.familyMember),
      attachment: new FormControl(
        { value: setEditAttach, disabled: viewMode },
        Validators.required
      ),
      lineNo: new FormControl(editObj.lineNumber)
    });

    return this.childFormGroup;
  }

  onSubmitConfirmation(actionStatus) {
    this.lineNumberDupli = this.reimbursmentService.checkDuplicateRowVal(
      this.form.value
    );
    if (this.lineNumberDupli.length > 0) {
      let duplMsg =
        'Entries at ' + this.lineNumberDupli.join() + ' should not same';
      this.messageService.showMessage(
        duplMsg,
        'Error',
        'warning-icon',
        'CLOSE'
      );
      return;
    }
    let confiMessage = '';
    if (actionStatus == 'draft') {
      this.reimbursementStatusKey = 'N';
      confiMessage = 'Do you want to Save as Draft?';
    } else if (actionStatus == 'submit') {
      this.reimbursementStatusKey = 'T';
      confiMessage =
        'Ensure all supporting documents are attached. Do you want to save?';
    }
    this.messageService.showConfirmation(
      confiMessage,
      'Confirmation',
      'confirmation-icon',
      reason => {
        if (reason === 'YES') {
          this.createGTPayLoad('', 'create');
        }
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  /**
   * handle file from browsing
   */
  fileBrowseHandler(files, i) {
    this.prepareFilesList(files, i);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.confirmDelete(index);
  }

  confirmDelete(index) {
    this.createGTPayLoad(index, 'deleteAttachment');
    this.form.controls[index]['controls'].attachment.value = '';
    this.attachFiles[index] = null;
  }
  onFileDrops(data, i) {
    this.prepareFilesList(data.files, i);
  }
  openPdf(data: any, index: number): void {
    let name = '';
    if (data.imageUrlClicked) {
      name = data.fileClicked.name.split('.')[0];
      this.onViewPdf(data.fileClicked, name);
    } else {
      name = this.attachFiles[index]
        ? this.attachFiles[index].fileName.split('.')[0]
        : '';
      let obj = {
        sapCode: this.attachFiles[index].reimbursementType,
        claimNo: this.attachFiles[index].claimNumber,
        lineNo: this.attachFiles[index].lineNumber
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

  CreateAndEdit(totalAmt, opr) {
    let lineNumber = '';
    for (let [index, childObj] of this.form.value.entries()) {
      totalAmt = totalAmt + parseInt(childObj.requestedAmt);
      this.billDetails.attachDoc = null; //case of create
      this.billDetails.billNumber = childObj.billNo;
      this.billDetails.billDate = new Date(childObj.billDate).getTime();
      this.billDetails.billAmount = childObj.requestedAmt;
      this.billDetails.remarks = childObj.remarks;
      this.billDetails.requestedAmount = childObj.requestedAmt;
      this.billDetails.childName = childObj.familyMember;
      this.billDetails.claimNumber = this.claimNumber
        ? this.claimNumber
        : this.addAttachmentKey == 'A'
        ? ' '
        : '';
      this.billDetails.lineNumber = childObj.lineNo;
      let claimDetailObj = JSON.parse(JSON.stringify(this.billDetails));
      this.setClaimDetail.push(claimDetailObj);
      console.log(this.setClaimDetail);
    }
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetail, totalAmt);
    this.hitOperationApi(0, finalPayLoad, opr);
  }

  prepareFilesList(files: Array<any>, index) {
    if (files.length > 0) {
      let isFileSizeValid = false;
      let isFileTypeValid = false;
      isFileSizeValid = this.reimbursmentService.isFileSizeValid(files[0]);
      isFileTypeValid = this.reimbursmentService.isFileTypeValid(files[0]);
      if (isFileSizeValid && isFileTypeValid) {
        if (index != -1 && this.attachFiles.length > index) {
          this.attachFiles[index] = files[0];
        } else {
          this.attachFiles.push(files[0]);
        }

        this.form.controls[index]['controls'].attachment.value = files[0].name;
        this.validFile = false;
        this.disableBtn = false;
      } else {
        this.form.controls[index]['controls'].attachment.value = '';
        this.validFile = true;
        this.disableBtn = true;
      }
      this.createGTPayLoad(index, 'addAttachment');
    }
  }

  createGTPayLoad(index, opr) {
    //handle all operation payalod
    let totalAmt = 0; //total Amt of all claim
    this.setClaimDetail = [];
    if (opr == 'addAttachment') {
      this.addAttachmentFuctionality(index, totalAmt, opr);
    } else if (opr == 'deleteAttachment') {
      this.deleteAttachmentFunctionality(index, opr);
    } else if (opr == 'deleteRow') {
      this.deleteFormRow(index, opr);
    } else if (opr == 'create') {
      this.CreateAndEdit(totalAmt, opr);
    }
  }

  addAttachmentFuctionality(index, totalAmt, opr) {
    this.addAttachmentKey = 'A';
    let lineNumber = this.form.controls[index]['controls'].lineNo.value;
    this.billDetails.lineNumber = lineNumber;
    totalAmt =
      totalAmt +
      parseInt(this.form.controls[index]['controls'].requestedAmt.value);
    this.billDetails.attachDoc = null; //case of cremedicalObjate
    this.billDetails.billNumber = this.form.controls[index][
      'controls'
    ].billNo.value;
    this.billDetails.billDate = new Date(
      this.form.controls[index]['controls'].billDate.value
    ).getTime();
    this.billDetails.billAmount = this.form.controls[index][
      'controls'
    ].requestedAmt.value;
    this.billDetails.remarks = this.form.controls[index][
      'controls'
    ].remarks.value;
    this.billDetails.requestedAmount = this.form.controls[index][
      'controls'
    ].requestedAmt.value;
    this.billDetails.childName = this.form.controls[index][
      'controls'
    ].familyMember.value;
    this.billDetails.claimNumber = this.claimNumber
      ? this.claimNumber
      : this.addAttachmentKey == 'A'
      ? ' '
      : '';

    let claimDetailObj = JSON.parse(JSON.stringify(this.billDetails));
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
    this.attachmentGTObj.lineNumber = this.form.controls[index][
      'controls'
    ].lineNo.value;

    let claimDetailObj = JSON.parse(JSON.stringify(this.attachmentGTObj));
    this.hitOperationApi(index, claimDetailObj, opr);
  }

  deleteForm(index) {
    let lineNumber = '';
    lineNumber = this.form.controls[index]['controls'].lineNo.value;
    this.form.removeAt(index);
    this.displayFiles[index] = [];
    this.attachFiles.splice(index, 1);
    this.lineNoToDelete.push(lineNumber);
    this.createGTPayLoad(index, 'deleteRow');
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
          err => {
            console.log(err);
          }
        );
    } else if (opr == 'deleteAttachment') {
      this.reimbursmentService.deleteAttachment(payload).subscribe(
        (data: any) => {
          console.log(data);
          this.form.controls[index]['controls'].attachment.value = '';
          this.attachFiles[index] = null;
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
      requestNumberNC: ''
    };
    console.log(payload);
    return payload;
  }

  guestNumericValidation(event, index, grp) {
    let numericVal = this.reimbursmentService.spacevalidation(event);
    if (numericVal) {
      let inputVal = event.target.value.slice(1, -1);
      grp.get(event.target.name).patchValue(inputVal);
    } else {
      if (this.reimbursmentService.setNumeric(event.target.value)) {
        let inputVal = event.target.value.slice(0, -1);
        grp.get(event.target.name).patchValue(inputVal);
      }
    }
  }

  firstSpaceValidate(event, index, grp) {
    let isNotValid = this.reimbursmentService.spacevalidation(event);
    if (isNotValid) {
      let inputVal = event.target.value.slice(1, -1);
      grp.get(event.target.name).patchValue(inputVal);
    }
  }
  ngOnDestroy(): void {
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      });
    }
  }
}
