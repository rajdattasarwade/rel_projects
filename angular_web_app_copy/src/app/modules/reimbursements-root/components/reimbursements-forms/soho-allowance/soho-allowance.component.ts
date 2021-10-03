import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ClaimYear,
  CreateClaimPayloadModel,
  DeleteAttachmentModel,
  ReimbursementsTypeObjectModel,
  TypeOfExpense,
} from './soho-allowance.model';

@Component({
  selector: 'app-soho-allowance',
  templateUrl: './soho-allowance.component.html',
  styleUrls: ['./soho-allowance.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SohoAllowanceComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  reimbursementType: string = '';
  formGroup: FormGroup;
  overviewDetails: any;
  viewMode: boolean = false;
  claimDetails: ReimbursementsTypeObjectModel;
  sapCode: string = 'ZSOH';
  typetext: string;
  claimHeaderDetails: ClaimHeaderModel;
  requestNumberNC: string;
  requestOperation: string = 'EC';
  claimDetailsArray: ReimbursementsDetails[] = [];
  claimNumber: string = '';
  claimYearsArray: ClaimYear[];
  typeOfExpenseAttay: TypeOfExpense[];
  fileObj: any;
  file: any;
  fileToDownloadUrl: any;
  fileNameToSave: string;
  fileSizeLimit: number = 1024 * 1024;
  existingFilesArray: any[] = [];
  acceptedFormats = ['.pdf'];
  saveAsDraft: boolean = false;
  elibilityData: ReimbursementsTypeDetails;
  attachmentName: string = '';
  edit: boolean = false;
  showUploadAttachment: boolean = true;
  attachmentObj: AttachDoc = null;
  showDeletebutton: boolean = false;
  isClaimStatusSubmitted: boolean = false;
  constructor(
    private reimbursementService: ReimbursementsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private messageModalService: MessageModalService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public overviewData: any,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscription = new Subscription();
    console.log('SOHO..passed data=>', overviewData);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getEligibility();
    console.log('....overviewData.....', this.overviewData);
    console.log('....getSohoEligibility.....', this.elibilityData);
    this.populateOverviewDetails();
    console.log('....reimbursementType...' + this.reimbursementType);
    console.log('....overviewDetail.....', this.overviewDetails);
    console.log('viewMode=>', this.viewMode);
    console.log('sapCode=>', this.sapCode);
    this.showDeletebutton = !this.viewMode;
  }
  populateOverviewDetails() {
    if (this.overviewData.payLoad.setOperation == 'Edit') {
      this.edit = true;
      this.overviewDetails = this.overviewData.payLoad.typeDetails;
      this.viewMode = this.overviewData.payLoad.viewMode;
      //call claim details
      this.requestOperation = 'EE';
      console.log('edit mode overviewData===>', this.overviewData);
      this.claimDetails = JSON.parse(JSON.stringify(this.overviewDetails));
      this.typetext = this.claimDetails.reimbursementTypeKey.value;
      console.log('edit form ====>');
      this.getClaimHeaderDetails();
      // this.getClaimDetails();
      if (this.overviewData.payLoad.typeDetails.statusText.includes('Saved')) {
        this.isClaimStatusSubmitted = true;
      }
    } else {
      this.edit = false;
      this.showUploadAttachment = true;
      this.overviewDetails = this.overviewData.typeDetails;
      this.viewMode = this.overviewData.payLoad.viewMode;
      this.reimbursementType = this.overviewDetails.reimbursementText;
      this.requestOperation = 'EC';
      this.sapCode = this.overviewData.typeDetails.reimbursementType.sapCode;
      this.typetext = this.overviewData.typeDetails.reimbursementType.value;
    }
    this.createFromGroup();
  }
  getClaimDetails() {
    var sub = this.reimbursementService
      .getClaimBills(this.claimDetails.claimNumber)
      .subscribe(
        (data: any) => {
          this.claimDetailsArray = data;
          if (this.claimDetailsArray.length > 0) {
            this.claimNumber = this.claimDetailsArray[0].claimNumber;
            this.attachmentObj = this.claimDetailsArray[0].attachDoc;
            console.log('matkar->', data);
            this.populateEditFormGroup(
              this.claimHeaderDetails,
              this.claimDetailsArray[0]
            );
            // for (let claimObj of this.claimDetailsArray) {
            //   this.formsArray.push(this.populateEditForm(claimObj));
            // }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    this.subscription.add(sub);
  }

  // getSohoEligibility() {
  //   this.elibilityData = this.reimbursementService.sohoEligibility;
  //   this.reimbursementType = this.elibilityData
  //     ? this.elibilityData.reimbursementText
  //     : 'SOHO Allowance';
  //   this.getDropdownData();
  // }
  getEligibility() {
    storeReimbursementType.typeObj.forEach(
      (type: ReimbursementsTypeDetails) => {
        if (type.reimbursementType.sapCode == 'ZSOH') {
          this.elibilityData = type;
          console.log('type=>', type);
        }
      }
    );
    this.getReimbursementType();
    this.reimbursementType = this.elibilityData
      ? this.elibilityData.reimbursementText
      : 'SOHO Allowance';

    this.getDropdownData();
  }
  getClaimHeaderDetails() {
    var sub = this.reimbursementService
      .getClaimHeader(this.claimDetails.claimNumber)
      .subscribe(
        (data) => {
          this.claimHeaderDetails = data[0];
          this.requestNumberNC = this.claimHeaderDetails.requestNumberNC;
          console.log('header data=>', data);
          this.getClaimDetails();
        },
        (err) => {
          console.log(err);
        }
      );
    this.subscription.add(sub);
  }
  populateEditFormGroup(
    claimHeaderObj: ClaimHeaderModel,
    claimDetailObj: ReimbursementsDetails
  ) {
    let hasAttach = false;
    console.log(' edit mode claim claimHeaderObj=>', claimHeaderObj);
    console.log(' edit mode claim claimDetailObj=>', claimDetailObj);
    if (claimDetailObj.attachDoc && claimDetailObj.attachDoc != null) {
      hasAttach = true;
      this.attachmentName = claimDetailObj.attachDoc.fileName;
      this.showUploadAttachment = false;
    }
    this.formGroup = this.formBuilder.group({
      claimMonthNC: [
        { value: claimHeaderObj.claimMonthNC, disabled: this.viewMode },
        [Validators.required, Validators.nullValidator],
      ],
      claimYear: [
        { value: claimHeaderObj.claimYear, disabled: this.viewMode },
        [Validators.required],
      ],
      remarks: [
        {
          value: claimHeaderObj.claimDetail.results[0].remarks,
          disabled: this.viewMode,
        },
      ],
      billDate: [
        {
          value: claimHeaderObj.claimDetail.results[0].billDate,
          disabled: this.viewMode,
        },
        [Validators.required],
      ],
      requestedAmount: [
        {
          value: claimHeaderObj.claimDetail.results[0].requestedAmount,
          disabled: this.viewMode,
        },
        [
          Validators.required,
          Validators.min(1),
          Validators.max(
            this.elibilityData ? this.elibilityData.balanceAmount : 999999999
          ),
        ],
      ],
      // attachment: [hasAttach, [Validators.requiredTrue]],
    });
    this.changeDetectorRef.detectChanges();
  }
  createFromGroup() {
    let hasAttach = false;
    let setEditAttach = '';
    this.formGroup = this.formBuilder.group({
      claimMonthNC: [
        { value: '', disabled: this.viewMode },
        [Validators.required, Validators.nullValidator],
      ],
      claimYear: [
        { value: '', disabled: this.viewMode },
        [Validators.required],
      ],
      remarks: [{ value: '', disabled: this.viewMode }],
      billDate: [{ value: new Date().getTime(), disabled: this.viewMode }],
      requestedAmount: [
        { value: null, disabled: this.viewMode },
        [
          Validators.required,
          Validators.min(1),
          Validators.max(
            this.elibilityData ? this.elibilityData.balanceAmount : 999999999
          ),
        ],
      ],
      // attachment: [hasAttach, [Validators.requiredTrue]],
    });
    return;
  }

  getDropdownData() {
    var sub = this.reimbursementService.getDropdownData(this.sapCode).subscribe(
      (data) => {
        console.log('dropdown=>', data);
        this.claimYearsArray = data['CLAIM_YEAR'];
        this.typeOfExpenseAttay = data['TYPE_OF_EXPENSE'];
        this.typeOfExpenseAttay.splice(0, 1);
      },
      (error) => {
        console.error('SOHO ERROR In DROPDWON API=>', error);
      }
    );
    this.subscription.add(sub);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Attachment Operations
   */
  clearFile() {
    console.log('clear file');
    this.fileObj = null;
    this.updateAttachment(false);
    this.showUploadAttachment = true;
  }
  onFileChange(files) {
    if (files && files[0]) {
      console.log('file size=>', files[0].size);
      console.log('file=>', files[0]);
      this.fileObj = files[0];
      this.existingFilesArray.push(files[0]);
    }
  }
  filesDropped(event) {
    console.log('filesDropped event=>', event);
    console.log('file attacg drag drop ', event);
    this.onFileChange(event.files);
    this.fileToDownloadUrl = event.imageUrls;
    this.updateAttachment(true);
  }
  viewClicked(event) {
    console.log('viewClickedevent->', event);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = event.imageUrlClicked;
    dialogRef.componentInstance.title = event.fileClicked.name;
  }
  filesDeleted(event) {
    console.log('filesDeleted=>');
    this.clearFile();
  }
  /**
   * END ATTACHMEN
   *
   */
  /**
   * FORM ADD/DELETE EVENTS
   */
  errorMessage: string = '';
  isFormValid: boolean = false;
  checkRequestedAmount() {
    console.log('checkRequestedAmount');
    let amount = this.formGroup.get('requestedAmount').value;
    if (this.elibilityData.balanceAmount - amount >= 0) {
      this.errorMessage = '';
      this.isFormValid = true;
    } else {
      // grp.get(event.target.name).patchValue(inputVal);
      this.isFormValid = false;
      this.errorMessage =
        'Entered amount can not be greater than balance amount';
    }
  }

  onSubmit(saveAsDraft: boolean) {
    console.log('this.formGroup', this.formGroup.value);
    if (this.formGroup.invalid) {
      console.log('form is not valid...');
      console.log(this.formGroup.status);
      console.log(this.formGroup.valid);
      console.log(this.formGroup.invalid);
      this.showErrorMessageOk('Please fill required fields!!!');
      return;
    }
    this.saveAsDraft = saveAsDraft;
    console.log('onSubmit');
    let message = saveAsDraft
      ? SAVE_AS_DRAFT_CONFIRMATION
      : 'Do you want to Save?';
    this.messageModalService.showConfirmation(
      message,
      'Confirmation',
      'confirmation-icon',
      this.confirmationResponse.bind(this),
      'Yes',
      'No'
    );
  }
  confirmationResponse(d) {
    if (d == 'YES') {
      // this.submit();
      this.oldSubmit();
    }
  }
  submit() {
    this.addAttachment();
    var sub = this.reimbursementService
      .createClaim(this.getFinalPayload())
      .subscribe(
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
  oldSubmit() {
    let fileArray = [];
    fileArray.push(this.fileObj);
    var sub = this.reimbursementService
      .createReimbursemnets(this.getFinalPayload(), fileArray)
      .subscribe(
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
  addAttachment() {
    var sub = this.reimbursementService
      .addAttachment(this.getFinalPayload, this.fileObj)
      .subscribe(
        (data) => {
          console.log('add atchment data=>', data);
          this.populateResponseMessage(data);
        },
        (error) => {
          console.error('error in add actahment=>', error);
          this.showErrorMessage(
            'Attachment upload failed. Unexpected Error Occurred!'
          );
        }
      );
    this.subscription.add(sub);
  }
  getFinalPayload(): CreateClaimPayloadModel {
    let payload = new CreateClaimPayloadModel();
    let reimbursementsDetailsPayload = new ReimbursementsDetails(null);
    reimbursementsDetailsPayload.remarks = this.formGroup.get('remarks').value;
    reimbursementsDetailsPayload.lcPlaceTo = null;
    reimbursementsDetailsPayload.lcPlaceFrom = null;
    reimbursementsDetailsPayload.vendorNameNC = null;
    reimbursementsDetailsPayload.billDate = this.formGroup.get(
      'billDate'
    ).value;
    reimbursementsDetailsPayload.hasAttached = true;
    reimbursementsDetailsPayload.requestedAmount = this.formGroup.get(
      'requestedAmount'
    ).value;
    reimbursementsDetailsPayload.lineNumber = '0001';

    payload.reimbursementType = this.sapCode;
    payload.totalAmount = this.formGroup.get('requestedAmount').value;
    payload.requestOperation = this.requestOperation;
    payload.claimDetail = [reimbursementsDetailsPayload];
    payload.deletedLineNumber = [];
    payload.reimbursementStatus = this.saveAsDraft ? 'N' : 'T';
    payload.claimNumber = this.claimNumber;
    payload.claimMonthNC = this.formGroup.get('claimMonthNC').value;
    payload.claimYear = this.formGroup.get('claimYear').value;

    return payload;
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

  delete() {
    this.messageModalService.showConfirmation(
      'Do you want to delete claim?',
      'Confirmation',
      'confirmation-icon',
      this.deleteConfirmationResponse.bind(this),
      'Yes',
      'No'
    );
  }
  deleteConfirmationResponse(d) {
    if (d == 'YES') {
      // this.submit();
      this.deleteClaim();
    }
  }
  deleteAttachment() {
    console.log('deleteAttachment');
    let deletePayLoad = new DeleteAttachmentModel();

    // deletePayLoad.claimNumber
  }

  deleteClaim() {
    var sub = this.reimbursementService.deleteClaim(this.claimNumber).subscribe(
      (res) => {
        if (res) {
          // this.callRembDetails();
          this.populateResponseMessage(res);
        }
      },
      (error) => {
        this.showErrorMessage('Unable to delete. Unexpected Error Occurred!');
        console.error('SOHO ERROR in deleteClaim', error);
      }
    );
    this.subscription.add(sub);
  }

  getAttachment() {
    this.openDocument(this.claimDetailsArray[0].attachDoc);
  }
  openDocument(attachDoc) {
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
        console.error('SOHO ALlowwance Error in open document', error);
      }
    );
    this.subscription.add(sub);
  }
  /**
   * Form Group Update Methos
   * profileForm.valid
   */

  updateAttachment(flag: boolean) {
    this.formGroup.controls['attachment'].setValue(flag);
    this.attachmentName = flag ? this.fileObj.name : '';
  }
  /**
   * End form gropu update methods
   *
   */
  /**
   * new
   */
  getReimbursementType() {
    var sub = this.reimbursementService.getRembTypeDetails().subscribe(
      (data: ReimbursementsTypeDetails[]) => {
        data.forEach((type: ReimbursementsTypeDetails) => {
          if (type.reimbursementType.sapCode == 'ZSOH') {
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
}
