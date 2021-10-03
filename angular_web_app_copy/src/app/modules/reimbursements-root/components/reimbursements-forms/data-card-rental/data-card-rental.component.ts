import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import {
  AttachDoc,
  ReimbursementsDetails,
  ReimbursementsTypeDetails,
  SAVE_AS_DRAFT_CONFIRMATION,
  SAVE_CONFIRMATION,
  storeReimbursementType,
} from '../../../utils/reimbursements.model';
import {
  ClaimHeaderModel,
  ReimbursementsTypeObjectModel,
} from '../soho-allowance/soho-allowance.model';

@Component({
  selector: 'app-data-card-rental',
  templateUrl: './data-card-rental.component.html',
  styleUrls: ['./data-card-rental.component.css'],
})
export class DataCardRentalComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  reimbursementType: string = '';
  elibilityData: ReimbursementsTypeDetails;
  form: FormArray;
  childFormGroup: FormGroup;

  sapCode: string = 'ZDCT';
  requestOperation: string = 'EC';
  fileObj: any;
  file: any;
  fileToDownloadUrl: any;
  fileNameToSave: string;
  existingFilesArray: any[] = [];
  fileSizeLimit: number = 1024 * 1024;
  maxSize = '2mb';
  acceptedFormats = ['.pdf'];
  viewMode: boolean = false;
  edit: boolean = false;
  attachmentObj: AttachDoc = null;
  overviewDetails: any;
  claimDetails: ReimbursementsTypeObjectModel;
  typetext: string;
  claimHeaderDetails: ClaimHeaderModel;
  requestNumberNC: string;
  claimDetailsArray: ReimbursementsDetails[] = [];
  claimNumber: string = '';
  today = new Date();
  lineNumberDupli: any = [];
  saveAsDraft: boolean = false;
  counter: number = 1;
  setClaimDetail: any = [];
  addAttachmentKey: string = '';
  lineNoToDelete: string[] = [];
  attachmentGTObj: AttachDoc = new AttachDoc([]);
  mainClaimObjects: ReimbursementsDetails = new ReimbursementsDetails(null);
  isClaimStatusSubmitted: boolean = false;
  constructor(
    private reimbursementService: ReimbursementsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private messageModalService: MessageModalService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public passedData: any
  ) {
    this.subscription = new Subscription();
    console.log('DataCardRental.passed data=>', passedData);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getEligibility();
    this.populateIntialDetails();
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  getEligibility() {
    storeReimbursementType.typeObj.forEach(
      (type: ReimbursementsTypeDetails) => {
        if (type.reimbursementType.sapCode == 'ZDCT') {
          this.elibilityData = type;
        }
      }
    );
    this.getReimbursementType();
    this.reimbursementType = this.elibilityData
      ? this.elibilityData.reimbursementText
      : 'Data Card Rental Allowance';
  }

  populateIntialDetails() {
    this.form = new FormArray([]);
    this.counter = 1;
    if (this.passedData.payLoad.setOperation == 'Edit') {
      this.edit = true;
      this.overviewDetails = this.passedData.payLoad.typeDetails;
      this.viewMode = this.passedData.payLoad.viewMode;
      //call claim details
      this.requestOperation = 'EE';
      console.log('edit mode passedData===>', this.passedData);
      this.claimDetails = JSON.parse(JSON.stringify(this.overviewDetails));
      this.typetext = this.claimDetails.reimbursementTypeKey.value;
      console.log('edit form ====>');
      this.headerClaimDetails();
      this.getClaimObjectDetails();
      if (this.passedData.payLoad.typeDetails.statusText.includes('Saved')) {
        this.isClaimStatusSubmitted = true;
      }
    } else {
      this.edit = false;
      this.overviewDetails = this.passedData.typeDetails;
      this.viewMode = this.passedData.payLoad.viewMode;
      this.reimbursementType = this.overviewDetails.reimbursementText;
      this.requestOperation = 'EC';
      this.sapCode = this.passedData.typeDetails.reimbursementType.sapCode;
      this.typetext = this.passedData.typeDetails.reimbursementType.value;
      this.addForm();
    }
  }

  onSubmit(saveAsDraft: boolean) {
    if (this.form.invalid) {
      console.log('form is not valid...');
      console.log(this.form.status);
      console.log(this.form.valid);
      console.log(this.form.invalid);
      this.showErrorMessageOk('Please fill required fields!!!');
      return;
    }
    this.lineNumberDupli = this.reimbursementService.checkDuplicateRowVal(
      this.form.value
    );
    if (this.lineNumberDupli.length > 0) {
      let duplMsg =
        'Entries at ' + this.lineNumberDupli.join() + ' should not same';
      this.showErrorMessage(duplMsg);
      return;
    }

    this.saveAsDraft = saveAsDraft;
    console.log('onSubmit');
    let message = saveAsDraft ? SAVE_AS_DRAFT_CONFIRMATION : SAVE_CONFIRMATION;
    this.messageModalService.showConfirmation(
      message,
      'Confirmation',
      'confirmation-icon',
      this.confirmationResponse.bind(this),
      'Yes',
      'No'
    );
  }

  totalAmountValid(): boolean {
    return false;
  }
  confirmationResponse(d) {
    if (d == 'YES') {
      this.dataCardCreateAndEdit();
    }
  }
  populateResponseMessage(data) {
    let msgObj = JSON.parse(data.responseData);
    var msg =
      data['responseStatus'] == 'SUCCESS'
        ? msgObj.message
        : data['responseStatus'] == 'FAILED'
        ? data['systemErrMsg']
        : msgObj.message;
    var status = data['responseStatus'] == 'SUCCESS' ? 'Success' : 'Error';
    var icon =
      data['responseStatus'] == 'SUCCESS' ? 'success-icon' : 'warning-icon';
    this.messageModalService.showMessage(msg, status, icon, 'CLOSE', () => {
      if (data['responseStatus'] == 'SUCCESS') {
        this.dialogRef.close('success');
      }
    });
  }
  showErrorMessage(message) {
    this.messageModalService.showMessage(
      message,
      'Error',
      'warning-icon',
      'CLOSE'
    );
  }
  showErrorMessageOk(message) {
    this.messageModalService.showMessage(
      message,
      'Error',
      'warning-icon',
      'OK'
    );
  }

  createClaimPostApi(finalPayLoad) {
    var sub = this.reimbursementService.createClaim(finalPayLoad).subscribe(
      (data) => {
        this.populateResponseMessage(data);
      },
      (error) => {
        this.showErrorMessage('Unexpected Error Occurred!');
        console.error('Soho SAVE ERROR => ', error);
      }
    );
    this.subscription.add(sub);
  }
  deleteForm(index) {
    this.form.removeAt(index);
  }

  addForm() {
    this.form.push(this.createGroup(this.counter++));
  }

  baseFormDetails: ClaimHeaderModel;
  attachFiles: any[] = [];

  headerClaimDetails() {
    var sub = this.reimbursementService
      .getClaimHeader(this.claimDetails.claimNumber)
      .subscribe(
        (data) => {
          this.baseFormDetails = data[0];
          this.requestNumberNC = this.baseFormDetails.requestNumberNC;
        },
        (err) => {
          console.log(err);
        }
      );
    this.subscription.add(sub);
  }
  getClaimObjectDetails() {
    var sub = this.reimbursementService
      .getClaimBills(this.claimDetails.claimNumber)
      .subscribe(
        (data: ReimbursementsDetails[]) => {
          //billDetails
          this.claimDetailsArray = data;
          if (this.claimDetailsArray.length) {
            this.claimNumber = this.claimDetailsArray[0].claimNumber;
            for (let editObj of this.claimDetailsArray) {
              this.existingFilesArray.push(editObj.attachDoc);
              this.attachFiles.push(editObj.attachDoc);
              this.form.push(this.populateEditFormGroup(editObj));
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    this.subscription.add(sub);
  }

  populateEditFormGroup(claimDetailObj: ReimbursementsDetails) {
    let hasAttach = false;
    let showUploadAttachment = true;
    let attachmentName = '';
    console.log(' edit mode claim claimDetailObj=>', claimDetailObj);
    if (claimDetailObj.attachDoc && claimDetailObj.attachDoc != null) {
      console.log('#1 edit ==>ok', claimDetailObj);
      hasAttach = true;
      attachmentName = claimDetailObj.attachDoc.fileName;
      showUploadAttachment = false;
    } else {
      console.log('problem in attachDoc');
    }
    this.childFormGroup = this.formBuilder.group({
      attachDoc: [claimDetailObj.attachDoc],
      billNo: [
        { value: claimDetailObj.billNumberNC, disabled: this.viewMode },
        [Validators.required, Validators.maxLength(20)],
      ],
      fromDate: [
        { value: new Date(claimDetailObj.billDate), disabled: this.viewMode },
        [Validators.required],
      ],
      toDate: [
        { value: new Date(claimDetailObj.travelDate), disabled: this.viewMode },
        [Validators.required],
      ],
      billAmount: [
        { value: claimDetailObj.billAmount, disabled: this.viewMode },
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.min(1),
          Validators.max(
            this.elibilityData ? this.elibilityData.balanceAmount : 9999999999
          ),
        ],
      ],
      remarks: [{ value: claimDetailObj.remarks, disabled: this.viewMode }],
      attachment: [hasAttach, Validators.requiredTrue],
      requestedAmount: [
        { value: claimDetailObj.requestedAmount, disabled: this.viewMode },
      ],
      attachmentName: [attachmentName],
      showUploadAttachment: [showUploadAttachment],
      fileToDownloadUrl: [''],
      lineNo: [claimDetailObj.lineNumber],
    });
    return this.childFormGroup;
  }
  createGroup(counter): FormGroup {
    this.childFormGroup = this.formBuilder.group({
      billNo: [null, [Validators.required, Validators.maxLength(20)]],
      fromDate: [Date, [Validators.required]],
      toDate: [Date, [Validators.required]],
      billAmount: [
        null,
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.min(1),
          Validators.max(
            this.elibilityData ? this.elibilityData.balanceAmount : 9999999999
          ),
        ],
      ],
      remarks: [null],
      attachment: [false, Validators.requiredTrue],
      requestedAmount: [0],
      lineNo: ['000' + counter],
      attachmentName: [''],
      showUploadAttachment: [true],
      fileToDownloadUrl: [''],
    });
    return this.childFormGroup;
  }

  showAttachmentNameLabel(index): boolean {
    return (
      this.form.controls[index]['controls'].attachmentName?.value != '' &&
      !this.showAttachmentComponent(index)
    );
  }
  showAttachmentComponent(index): boolean {
    return this.form.controls[index]['controls'].showUploadAttachment?.value;
  }
  getAttachment(index) {
    console.log('open attachment at index=>', index);
    this.openDocument(this.form.controls[index]['controls'].attachDoc.value);
  }
  openDocument(attachDoc) {
    console.log('openDocument attachDoc=>', attachDoc);
    var payload = {
      sapCode: attachDoc.reimbursementType,
      claimNo: attachDoc.claimNumber,
      lineNo: attachDoc.lineNumber,
    };
    var sub = this.reimbursementService.openAttachment(payload).subscribe(
      (res: Blob) => {
        console.log(res);
        if (res) {
          this.fileObj = new Blob([res], { type: 'application/pdf' });
          var pdfUrl = URL.createObjectURL(this.fileObj);
          const dialogRef = this.dialog.open(PdfViewerModalComponent);
          dialogRef.componentInstance.pdfUrl = pdfUrl;
          dialogRef.componentInstance.title = attachDoc.fileName;
          dialogRef.componentInstance.pdfName = attachDoc.fileName;
        }
      },
      (error) => {
        console.error('Datacard rental Error in open document', error);
      }
    );
    this.subscription.add(sub);
  }
  deleteFile(index: number) {
    this.confirmDeleteFile(index);
  }
  confirmDeleteFile(index) {
    this.messageModalService.showConfirmation(
      'Are you sure you want to delete the selected file?.',
      'Confirmation',
      'confirmation-icon',
      (reason) => {
        if (reason === 'YES') {
          this.deleteAttachmentFunctionality(index);
        }
      }
    );
  }
  deleteAttachmentFunctionality(index) {
    this.attachmentGTObj.fileName = this.attachFiles[index].fileName;
    this.attachmentGTObj.claimNumber = this.claimNumber;
    this.attachmentGTObj.reimbursementType = this.sapCode;
    this.attachmentGTObj.fileType = '.pdf';
    this.attachmentGTObj.deleteFlag = false;
    this.attachmentGTObj.lineNumber = this.form.controls[index][
      'controls'
    ].lineNo.value;

    let claimDetailObj = JSON.parse(JSON.stringify(this.attachmentGTObj));
    this.deletePostApi(index, claimDetailObj);
  }

  deletePostApi(index, payload) {
    var sub = this.reimbursementService.deleteAttachment(payload).subscribe(
      (data: any) => {
        console.log(data);
        this.form.controls[index]['controls'].attachment.value = '';
        this.attachFiles[index] = null;
        this.existingFilesArray[index] = null;
      },
      (err) => {
        console.log(err);
      }
    );
    this.subscription.add(sub);
  }

  addAttachmentFuctionality(index, totalAmt) {
    this.addAttachmentKey = 'A';

    for (let [index, datacardObj] of this.form.value.entries()) {
      totalAmt = totalAmt + parseInt(datacardObj.requestedAmount);
      if (totalAmt > this.elibilityData.balanceAmount) {
        this.showErrorMessage(
          'Total Amount:' +
            totalAmt +
            ' can not be greater then balance amount:' +
            this.elibilityData.balanceAmount
        );
        return;
      }
    }
    // totalAmt =
    //   totalAmt +
    //   parseInt(this.form.controls[index]['controls'].requestedAmount.value);
    this.mainClaimObjects.subType = null;
    this.mainClaimObjects.attachDoc = null;
    this.mainClaimObjects.billNumberNC = this.form.controls[index][
      'controls'
    ].billNo.value;
    this.mainClaimObjects.billDate = new Date(
      this.form.controls[index]['controls'].fromDate.value
    ).getTime();
    this.mainClaimObjects.travelDate = new Date(
      this.form.controls[index]['controls'].toDate.value
    ).getTime();
    this.mainClaimObjects.billAmount = this.form.controls[index][
      'controls'
    ].billAmount.value;
    this.mainClaimObjects.remarks = this.form.controls[index][
      'controls'
    ].remarks.value;
    this.mainClaimObjects.requestedAmount = this.form.controls[index][
      'controls'
    ].requestedAmount.value;
    this.mainClaimObjects.hasAttached = true;
    this.mainClaimObjects.claimNumber = this.claimNumber
      ? this.claimNumber
      : this.addAttachmentKey == 'A'
      ? ' '
      : '';
    this.mainClaimObjects.lineNumber = this.form.controls[index][
      'controls'
    ].lineNo.value;
    let claimDetailObj = JSON.parse(JSON.stringify(this.mainClaimObjects));
    let tempArray = [];
    tempArray.push(claimDetailObj);
    console.log('Add attachmet setClaimDetails', this.setClaimDetail);
    var finalPayLoad = this.createFinalPayLoad(tempArray, totalAmt);
    this.addAttachmentPostApi(index, finalPayLoad);
  }

  addAttachmentPostApi(index, payload) {
    var sub = this.reimbursementService
      .addAttachment(payload, this.existingFilesArray[index])
      .subscribe(
        (data: any) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
          this.showErrorMessage(
            'Unable to upload attachment. Please try again'
          );
          this.clearFile(index, false);
        }
      );
    this.subscription.add(sub);
  }
  deleteDatacardForm(index) {
    let lineNumber = '';
    lineNumber = this.form.controls[index]['controls'].lineNo.value;
    this.form.removeAt(index);
    // this.existingFilesArray.splice(index, 1);
    this.existingFilesArray[index] = null;
    this.lineNoToDelete.push(lineNumber);
    this.deleteFormRow(index);
    // if (this.form.length == 0) {
    //   this.addForm();
    // }
  }

  deleteFormRow(index) {
    console.log('setClaimDetail before row delete=>', this.setClaimDetail);
    this.setClaimDetail = this.setClaimDetail.splice(index, 1);
    console.log('setClaimDetail after row delete=>', this.setClaimDetail);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetail, 0);
    this.deleteRowPostApi(finalPayLoad);
  }

  deleteRowPostApi(payload) {
    var sub = this.reimbursementService.deleteRows(payload).subscribe(
      (data: any) => {
        console.log(data);
        this.lineNoToDelete = [];
      },
      (err) => {
        console.log(err);
      }
    );
    this.subscription.add(sub);
  }
  /**
   * Attachment Operations
   */
  clearFile(index, flag: boolean) {
    console.log('clear file');
    this.fileObj = null;
    this.existingFilesArray[index] = null;
    // this.existingFilesArray.splice(index, 1);
    this.updateAttachment(false, index);
    flag &&
      this.form.controls[index]['controls'].showUploadAttachment.setValue(flag);
  }
  onFileChange(files, index) {
    if (files && files[0]) {
      console.log('file size=>', files[0].size);
      console.log('file=>', files[0]);
      this.fileObj = files[0];
      this.existingFilesArray[index] = files[0];
    }
  }
  filesDropped(event, index) {
    console.log('filesDropped event=>', event);
    console.log('file attacg drag drop ', event);
    this.onFileChange(event.files, index);
    this.form.controls[index]['controls'].fileToDownloadUrl = event.imageUrls;
    this.fileToDownloadUrl = event.imageUrls;
    this.addAttachmentFuctionality(index, 0);
    this.updateAttachment(true, index);
  }
  viewClicked(event, index) {
    console.log('viewClickedevent->', event);
    console.log('existingFilesArray->', this.existingFilesArray);

    if (
      !event.imageUrlClicked ||
      this.existingFilesArray[index] == null ||
      this.existingFilesArray[index]['permanentNumber'] != null
    ) {
      console.log('file not present fetch from server...');
      this.getAttachment(index);
    } else {
      const dialogRef = this.dialog.open(PdfViewerModalComponent);
      let pdfUrl = URL.createObjectURL(this.existingFilesArray[index]);
      dialogRef.componentInstance.pdfUrl = pdfUrl;
      dialogRef.componentInstance.title = event.fileClicked.name;
    }
  }
  filesDeleted(event, index) {
    console.log('filesDeleted=>');
    this.form.controls[index]['controls'].fileToDownloadUrl = event.imageUrls;
    this.clearFile(index, false);
  }
  /**
   * END ATTACHMEN
   *
   */
  /**
   * Form Group Update Methos
   * profileForm.valid
   */

  updateAttachment(flag: boolean, index: number) {
    this.form.controls[index]['controls'].attachment.setValue(flag);
    let fileName = flag ? this.existingFilesArray[index]?.name : '';
    this.form.controls[index]['controls'].attachmentName.setValue(fileName);
    // this.form.controls[index]['controls'].showUploadAttachment.setValue(flag);
  }

  dataCardCreateAndEdit() {
    let lineNumber = '';
    let tempArray = [];
    let totalAmt = 0;
    for (let [index, datacardObj] of this.form.value.entries()) {
      totalAmt = totalAmt + parseInt(datacardObj.requestedAmount);
      if (totalAmt > this.elibilityData.balanceAmount) {
        this.showErrorMessage(
          'Total Amount:' +
            totalAmt +
            ' can not be greater then balance amount:' +
            this.elibilityData.balanceAmount
        );
        return;
      }
      this.mainClaimObjects.subType = null;
      this.mainClaimObjects.attachDoc = null; //case of create
      // this.mainClaimObjects.billNumber=datacardObj.billNo;
      this.mainClaimObjects.billNumberNC = datacardObj.billNo; // same as existing empXp
      this.mainClaimObjects.billDate = new Date(datacardObj.fromDate).getTime();
      this.mainClaimObjects.travelDate = new Date(datacardObj.toDate).getTime();
      this.mainClaimObjects.billAmount = datacardObj.billAmount;
      this.mainClaimObjects.remarks = datacardObj.remarks;
      this.mainClaimObjects.requestedAmount = datacardObj.requestedAmount;
      this.mainClaimObjects.hasAttached = true;
      this.mainClaimObjects.claimNumber = this.claimNumber
        ? this.claimNumber
        : this.addAttachmentKey == 'A'
        ? ' '
        : '';
      this.mainClaimObjects.lineNumber = datacardObj.lineNo;
      let claimDetailObj = JSON.parse(JSON.stringify(this.mainClaimObjects));
      tempArray.push(claimDetailObj);
      console.log('..payload array...', tempArray);
      console.log('..total amount...', totalAmt);
    }
    var finalPayLoad = this.createFinalPayLoad(tempArray, totalAmt);
    this.createEditClaimPost(finalPayLoad);
    // this.edit && this.createEditClaimPost(finalPayLoad);
    // !this.edit && this.oldSubmit(finalPayLoad);
  }

  createFinalPayLoad(obj, totalAmt) {
    var payload = {
      reimbursementType: this.sapCode,
      totalAmount: totalAmt,
      requestOperation: this.edit ? 'EE' : 'EC',
      claimDetail: obj,
      deletedLineNumber: this.lineNoToDelete,
      reimbursementStatus: this.saveAsDraft ? 'N' : 'T',
      claimNumber: this.claimNumber ? this.claimNumber : ' ',
    };
    console.log('payload=====>', payload);
    return payload;
  }

  createEditClaimPost(payload) {
    var sub = this.reimbursementService.createClaim(payload).subscribe(
      (data: any) => {
        console.log(data);
        this.populateResponseMessage(data);
      },
      (error) => {
        console.error('Error in Datacard CreateEditPost==>', error);
        this.showErrorMessage('Unabled to Save. Please try after sometime.');
      }
    );
    this.subscription.add(sub);
  }

  oldSubmit(payload) {
    let fileArray = [];
    fileArray.push(this.fileObj);
    var sub = this.reimbursementService
      .createReimbursemnets(payload, this.existingFilesArray)
      .subscribe(
        (data) => {
          this.populateResponseMessage(data);
        },
        (error) => {
          this.showErrorMessage('Unexpected Error Occurred!');
          console.error('datacard SAVE ERROR => ', error);
        }
      );
    this.subscription.add(sub);
  }
  getReimbursementType() {
    var sub = this.reimbursementService.getRembTypeDetails().subscribe(
      (data: ReimbursementsTypeDetails[]) => {
        data.forEach((type: ReimbursementsTypeDetails) => {
          if (type.reimbursementType.sapCode == 'ZDCT') {
            this.elibilityData = type;
            console.log('type=>', type);
          }
        });
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error in SOHO getReimbursementType', error);
      }
    );
    this.subscription.add(sub);
  }
  checkRequestedAmount(index) {
    if (this.form.controls[index]['controls'].requestedAmount.value == 0) {
      this.form.controls[index]['controls'].requestedAmount.setValue(null);
    }
  }
  checkBlurEvent(index) {
    console.log('1111');
    if (this.form.controls[index]['controls'].requestedAmount.value == null) {
      this.form.controls[index]['controls'].requestedAmount.setValue(0);
    }
  }

  getExistingFileName(index) {
    if (
      this.existingFilesArray[index] &&
      this.existingFilesArray[index]['fileName']
    ) {
      return [this.existingFilesArray[index]['fileName']];
    } else {
      return [];
    }
  }
}
