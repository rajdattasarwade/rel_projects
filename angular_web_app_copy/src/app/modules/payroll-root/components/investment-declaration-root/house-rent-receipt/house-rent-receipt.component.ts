import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { HouseRentReceiptRootService } from '../house-rent-receipt-root.service';
import {
  MyInvestmentAttachmentDetailModel,
  OverviewModelHouseRentReceipt,
} from '../investment-declaration-root.model';
import { InvestmentDeclarationRootService } from '../investment-declaration-root.service';
import { Section80cComponent } from '../section-80c/section-80c.component';
import { DeclarationMessage } from '../section80d/section80d.model';
import { HouseRentReceiptModel } from './house-rent-receipt.model';

@Component({
  selector: 'app-house-rent-receipt',
  templateUrl: './house-rent-receipt.component.html',
  styleUrls: ['./house-rent-receipt.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HouseRentReceiptComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @Input() edit: boolean = false;
  @Input() element: OverviewModelHouseRentReceipt;
  @Input() financialYear: string;
  @Input() create: boolean = false;
  houseRentReceiptObj: HouseRentReceiptModel;
  attachmentObj: MyInvestmentAttachmentDetailModel;
  listOfAttachmentObjs: MyInvestmentAttachmentDetailModel[] = [];
  requestNumber: string;
  lineNumber: string = '000';
  REQUEST_TYPE_HOUSE_RENT_RECEIPT = 'HOUSE_RENT_RECIEPT';
  fileAttached: boolean = false;
  attachedFileName: string;
  fileName: string;
  houseRentReceiptForm: FormGroup;
  fileObj: any;
  submitButonText: string = 'Save';
  isAcknowledged: boolean = false;
  fileSizeLimit: number = 1024 * 1024;
  constructor(
    public dialog: MatDialog,
    private rootService: InvestmentDeclarationRootService,
    public messageModalService: MessageModalService,
    public dialogRef: MatDialogRef<Section80cComponent>,
    private formBuilder: FormBuilder,
    private houseRentReceiptService: HouseRentReceiptRootService
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.submitButonText = this.edit ? 'Save' : 'Create';
    this.requestNumber = this.element.requestNumber;
  }
  onAttachFile(event) {
    this.fileAttached = true;
    this.fileName = event.target.files[0].name;
    this.fileObj = event.target.files[0];
    this.attachedFileName = 'HouseRentReceipts_' + new Date().getTime();
  }
  onAttachFile2(files) {
    this.fileAttached = true;
    this.fileName = files[0].name;
    this.fileObj = files[0];
    this.attachedFileName = 'HouseRentReceipts_' + new Date().getTime();
    console.log('file....>', this.fileObj);
  }
  populateHouseRentReceiptModelFromOverview() {
    this.houseRentReceiptObj = new HouseRentReceiptModel();
    this.requestNumber = this.element.requestNumber;
    this.houseRentReceiptObj.requestNumber = this.element.requestNumber;
    this.houseRentReceiptObj.fromDate = this.element.fromDate;
    this.houseRentReceiptObj.toDate = this.element.toDate;
    this.houseRentReceiptObj.requestCredit = this.element.requestCredit;
    this.houseRentReceiptObj.claimAmount = this.element.claimAmount;
    this.houseRentReceiptObj.approveAmount = this.element.approveAmount;
    this.houseRentReceiptObj.requestStatusKey = this.element.requestStatusKey;
    this.houseRentReceiptObj.employeeComments = this.element.employeeComments;
    this.houseRentReceiptObj.approveComments = this.element.approveComments;
    this.houseRentReceiptObj.requestStatusText = this.element.requestStatusKey;
    this.houseRentReceiptObj.actionFlag = this.element.actionFlag;
    this.houseRentReceiptObj.documentNumber = this.element.documentNumber;
    this.houseRentReceiptObj.sequenceNumber = this.element.sequenceNumber;
    this.houseRentReceiptObj.createFlag = this.element.createFlag;
  }
  getAttachmentDetailsList() {
    var sub = this.houseRentReceiptService
      .getMyInvestmentAttachmentList(
        this.REQUEST_TYPE_HOUSE_RENT_RECEIPT,
        this.requestNumber,
        this.lineNumber
      )
      .subscribe(
        (data: MyInvestmentAttachmentDetailModel[]) => {
          console.log('HouseRentReceipt Attachment data=>', data);
          this.listOfAttachmentObjs = data;
          this.fileName = this.listOfAttachmentObjs[0].fileName;
        },
        (error) => {
          console.error(
            'HouseRentReceipt error in myInvestmentAttacmentList=>',
            error
          );
        }
      );
    this.subscription.add(sub);
  }
  initFormGroup() {
    let houseRentReceiptObj = new HouseRentReceiptModel();
    if (!this.create && this.element) {
      this.populateHouseRentReceiptModelFromOverview();
      houseRentReceiptObj = this.houseRentReceiptObj;
      this.getAttachmentDetailsList();
    }
    this.houseRentReceiptForm = this.formBuilder.group({
      fromDate: [new Date(houseRentReceiptObj.fromDate), [Validators.required]], //required type
      toDate: [new Date(houseRentReceiptObj.toDate), [Validators.required]], //required
      claimAmount: [houseRentReceiptObj.claimAmount, [Validators.required]], //required type
      employeeComments: [houseRentReceiptObj.employeeComments],
      approveComments: [houseRentReceiptObj.approveComments],
    });
  }
  cancel() {
    console.log('cancel changes..');
    this.closeView();
  }
  closeView() {
    this.dialogRef.close();
  }
  submit() {
    console.log('submit houseRentReceipt');
    if (this.houseRentReceiptForm.invalid) {
      console.log('invalid form', this.houseRentReceiptForm);
      return;
    }
    let payLoad = this.populatePayload();
    if (this.edit) {
      this.updateExistingItem(payLoad);
    } else {
      this.createNewItem(payLoad);
    }
  }
  createNewItem(payLoad) {
    var sub = this.houseRentReceiptService
      .saveHouseRentReceipt(payLoad, this.fileObj, this.attachedFileName)
      .subscribe(
        (data) => {
          this.populateResponseMessage(data);
        },
        (error) => {
          this.errorPopUp();
          console.error('createNewItem SAVE ERROR => ', error);
        }
      );
    this.subscription.add(sub);
  }
  updateExistingItem(payLoad) {
    var sub = this.houseRentReceiptService
      .updateHouseRentReceipt(
        payLoad,
        this.fileObj,
        this.requestNumber,
        this.attachedFileName
      )
      .subscribe(
        (data) => {
          this.populateResponseMessage(data);
        },
        (error) => {
          this.errorPopUp();
          console.error('updateExistingItemERROR => ', error);
        }
      );
    this.subscription.add(sub);
  }
  populateResponseMessage(data) {
    var msg =
      data['responseStatus'] == 'SUCCESS'
        ? 'Successfully updated'
        : data['responseStatus'] == 'FAILED'
        ? data['systemErrMsg']
        : 'Request failed';
    var status = data['responseStatus'] == 'SUCCESS' ? 'Success' : 'Error';
    var icon =
      data['responseStatus'] == 'SUCCESS' ? 'success-icon' : 'warning-icon';
    this.messageModalService.showMessage(msg, status, icon, 'CLOSE', () => {
      this.dialogRef.close();
    });
  }

  populatePayload(): any {
    let payLoadObj = new HouseRentReceiptModel();
    let action = 'N';
    if (this.edit) {
      action = '';
      payLoadObj = this.houseRentReceiptObj;
    }
    let formvalues = this.houseRentReceiptForm.value;
    console.log('formValues', this.houseRentReceiptForm.value);
    console.log('formDate=>', formvalues.fromDate);
    payLoadObj.fromDate = formvalues.fromDate.valueOf();
    payLoadObj.toDate = formvalues.toDate.valueOf();
    payLoadObj.claimAmount = formvalues.claimAmount;
    payLoadObj.employeeComments = formvalues.employeeComments;
    let arrayOfHouseReceiptReceiptObjToSave: HouseRentReceiptModel[] = [];
    arrayOfHouseReceiptReceiptObjToSave.push(payLoadObj);
    let finalPayload = {
      requestNumber: this.requestNumber,
      message: '',
      action: action,
      receiptItemList: arrayOfHouseReceiptReceiptObjToSave,
    };
    return finalPayload;
  }
  errorPopUp() {
    this.messageModalService.showMessage(
      'Unexpected Error Occurred!',
      'Error',
      'warning-icon',
      'CLOSE'
    );
  }
  showDeclarationMessage() {
    this.isAcknowledged = !this.isAcknowledged;
    var msg = DeclarationMessage;
    var status = 'Decleration';
    var icon = 'info-icon';
    this.isAcknowledged &&
      this.messageModalService.showMessage(msg, status, icon, 'OK');
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      console.log('file size=>', event.target.files[0].size);
      if (event.target.files[0].size > 1024 * 1024) {
        this.largeFileError();
      }

      console.log('event=>', event.target.files[0]);
      this.fileObj = event.target.files[0];
    }
  }
  largeFileError() {
    var msg =
      'File size exceeded allowed limit. Please select pdf file with size less than 2MB.';
    var status = 'Error';
    var icon = 'warning-icon';
    this.messageModalService.showMessage(msg, status, icon, 'CLOSE', () => {
      this.ngOnInit();
    });
  }

  clearFile() {
    console.log('clear file');
    this.fileObj = [];
    this.closeView();
  }
  onClear() {
    console.log('clear file');
    this.fileObj = null;
    // this.dismiss();
  }
  fileToDownloadUrl: any;
  filesDropped(event) {
    console.log('filesDropped event=>', event);
    console.log('file attacg drag drop ', event);
    this.onAttachFile2(event.files);
    this.fileToDownloadUrl = event.imageUrls;
  }
  viewClicked(event) {
    console.log('viewClickedevent->', event);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = event.imageUrlClicked;
    dialogRef.componentInstance.title = event.fileClicked.name;
  }
  filesDeleted(event) {
    console.log('filesDeleted=>');
    this.onClear();
  }
  acceptedFormats = ['.pdf'];
}
