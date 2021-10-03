import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { AttachDoc, ReimbursementsDetails } from '../../../utils/reimbursements.model';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-other-reimbursement',
  templateUrl: './other-reimbursement.component.html',
  styleUrls: ['./other-reimbursement.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OtherReimbursementComponent implements OnInit {
  fxFlexColumn: number;
  reimbursementType: string;
  form: FormArray;
  childFormGroup: FormGroup;
  public othersForm: FormGroup;
  claimDetails: any;
  sapCode: any;
  typetext: any;
  validFile: boolean = false;
  addedFormBills: any[] = [];
  baseFormDetails: any;
  claimNumber: any;
  attachFiles: any[] = [];
  otherReimbursementList = [];
  reimburseStatusKey: any;
  guestCallback: () => {};
  obj = {
    attachDoc: null
  };
  payload: any;
  billDetails: ReimbursementsDetails = new ReimbursementsDetails(this.obj);
  billDetailsData: ReimbursementsDetails[] = [];
  counter = 1;
  lineNoToDelete: string[] = [];
  lineNumberDupli: any = [];
  addAttachmentKey: string = '';
  setClaimDetail: any = [];
  attachmentObj: AttachDoc = new AttachDoc([]);
  messageList: any  =[];
  maxDate = new Date();
  statusText: boolean = false;
  subscriptionList: Subscription[] = [];
  displayFiles: any[] = [];
  constructor(
    private reimbursmentService: ReimbursementsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageModalService
  ) {
    this.maxDate.setDate(new Date().getDate());
  }

  ngOnInit(): void {
    this.messageData();
    this.form = new FormArray([]);
    if (this.data.payLoad.setOperation == 'Edit') {
      //call claim details
      console.log('Details===>', this.data);
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
      this.expensetypeDropdown();
      this.headerClaimDetails();
      this.reimbursmentService
        .getClaimBills(this.claimDetails.claimNumber)
        .subscribe(
          (data: ReimbursementsDetails[]) => {
            //billDetails
            this.billDetailsData = data;
            if (this.billDetailsData.length) {
              this.claimNumber = this.billDetailsData[0].claimNumber;
              for (let editObj of this.billDetailsData) {
                this.attachFiles.push(editObj.attachDoc);
                if(editObj.attachDoc){
                  let obj = {
                    name: editObj.attachDoc.fileName,
                    lineNumber: editObj.attachDoc.lineNumber
                  }
                  this.displayFiles.push([obj]);
                }else{
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
    this.expensetypeDropdown();
    this.addForm();
    
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  expensetypeDropdown() {
    this.reimbursmentService
      .getDropDownsForReimbursement(this.sapCode)
      .subscribe(
        (data) => {
          data['TYPE_OF_EXPENSE'] = data['TYPE_OF_EXPENSE'].filter(
            (item) => item.code !== 'ZISPACE'
          );
    this.otherReimbursementList = data['TYPE_OF_EXPENSE'];
    console.log(this.otherReimbursementList);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  createGroup(counter) {
    this.childFormGroup = new FormGroup({
      otherReimbursementType: new FormControl('', Validators.required),
      billDate: new FormControl(Date, Validators.required),
      billNumber: new FormControl('', [Validators.required,Validators.maxLength(20)]),
      requestedAmount: new FormControl('', [Validators.required,Validators.maxLength(13)]),
      remarks: new FormControl('',[Validators.maxLength(200)]),
      attachment: new FormControl('',Validators.required),
      lineNo: new FormControl('000' + counter)
    });

    return this.childFormGroup;
  }

  headerClaimDetails() {
    this.reimbursmentService
      .getClaimHeader(this.claimDetails.claimNumber)
      .subscribe(
        (data) => {
          let baseFormDetails = data[0];
        },
        (err) => {
          console.log(err);
        }
      );
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
    let setEditAttach = '';
    if (editObj.attachDoc != 'undefined' && editObj.attachDoc != null) {
      setEditAttach = editObj.attachDoc.fileName;
    }
    this.childFormGroup = new FormGroup({
      otherReimbursementType: new FormControl({ value: editObj.otherReimbursementType,disabled: viewMode } , Validators.required),
      billDate: new FormControl({ value: new Date(editObj.billDate),disabled: viewMode }, Validators.required),
      billNumber: new FormControl({ value: editObj.billNumber,disabled: viewMode },  [Validators.required,Validators.maxLength(20)]),
      requestedAmount: new FormControl({ value: editObj.requestedAmount,disabled: viewMode }, [Validators.required,Validators.maxLength(13)]),
      remarks: new FormControl({ value: editObj.remarks,disabled: viewMode },[Validators.maxLength(200)]),
      attachment: new FormControl({ value: setEditAttach,disabled: viewMode },Validators.required),
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
      this.reimburseStatusKey = 'N';
      confiMessage = 'Do you want to Save as Draft?';
    } else if (actionStatus == 'submit') {
      this.reimburseStatusKey = 'T';
      confiMessage =
        'Ensure all supporting documents are attached. Do you want to save?';
    }
    this.messageService.showConfirmation(
      confiMessage,
      'Confirmation',
      'confirmation-icon',
      reason => {
        if (reason === 'YES') {
          this.createPayLoad('', 'create');
        }
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  
  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(data: any,index: number) {
    this.confirmDelete(index);
  }

  confirmDelete(index) {
    this.createPayLoad(index, 'deleteAttachment');
    this.form.controls[index].patchValue({
      attachment: '',
    });
    this.form.controls[index]['controls'].attachment.value =
      '';
    this.attachFiles[index] = null;
  }

  createAndEdit(totalAmt, opr) {
    let lineNumber = '';
    for (let [index, othersObj] of this.form.value.entries()) {
     
      totalAmt = totalAmt + parseInt(othersObj.requestedAmount);
      this.billDetails.otherReimbursementType = othersObj.otherReimbursementType;
      this.billDetails.attachDoc = null; //case of create
      this.billDetails.billNumber = othersObj.billNumber;
      this.billDetails.billDate = new Date(othersObj.billDate).getTime();
      this.billDetails.remarks = othersObj.remarks;
      this.billDetails.requestedAmount = othersObj.requestedAmount;
      this.billDetails.claimNumber = this.claimNumber
        ? this.claimNumber
        : this.addAttachmentKey == 'A'
        ? ' '
        : '';
      this.billDetails.lineNumber = othersObj.lineNo;
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
        this.form.controls[index].patchValue({
          attachment: files[0].name,
        });
        this.validFile = false;
      } else {
        this.form.controls[index].patchValue({
          attachment: '',
        });
        this.form.controls[index]['controls'].attachment.value = '';
        this.validFile = true;
      }
      this.createPayLoad(index, 'addAttachment');
    }
  }

  createPayLoad(index, opr) {
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
      this.createAndEdit(totalAmt, opr);
    }
  }

  addAttachmentFuctionality(index, totalAmt, opr) {
    this.addAttachmentKey = 'A';
    let lineNumber = this.form.controls[index]['controls'].lineNo.value;
    this.billDetails.lineNumber = lineNumber;
    totalAmt =
      totalAmt +
      parseInt(this.form.controls[index]['controls'].requestedAmount.value);
    this.billDetails.attachDoc = null; //case of cremedicalObjate
    this.billDetails.billNumber = this.form.controls[index][
      'controls'
    ].billNumber.value;
    this.billDetails.billDate = new Date(
      this.form.controls[index]['controls'].billDate.value
    ).getTime();
    this.billDetails.remarks = this.form.controls[index][
      'controls'
    ].remarks.value;
    this.billDetails.requestedAmount = this.form.controls[index][
      'controls'
    ].requestedAmount.value;
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
    this.attachmentObj.fileName = this.attachFiles[index].fileName;
    this.attachmentObj.claimNumber = this.claimNumber;
    this.attachmentObj.reimbursementType = this.sapCode;
    this.attachmentObj.fileType = '.pdf';
    this.attachmentObj.deleteFlag = false;
    this.attachmentObj.lineNumber = this.form.controls[index][
      'controls'
    ].lineNo.value;

    let claimDetailObj = JSON.parse(JSON.stringify(this.attachmentObj));
    this.hitOperationApi(index, claimDetailObj, opr);
  }

  deleteForm(index) {
    let lineNumber = '';
    lineNumber = this.form.controls[index]['controls'].lineNo.value;
    this.form.removeAt(index);
    this.attachFiles.splice(index, 1);
    this.lineNoToDelete.push(lineNumber);
    this.createPayLoad(index, 'deleteRow');
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
          this.form.value[index].attachment = null
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
      reimbursementStatus: this.reimburseStatusKey
        ? this.reimburseStatusKey
        : '',
      // requestNumberNC: this.form.value[0]['traRequestNo']
      //   ? this.form.value[0]['traRequestNo']
      //   : ''
    };
    console.log(payload);
    return payload;
  }

  messageData(){
    this.reimbursmentService
      .getReimbursementMessage()
      .subscribe(
        (data: any) => {
         this.messageList = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  otherType(event,i){
    console.log(event);
    
    let msg = this.messageList.filter((item) => {
      return item.reimbursementType === this.sapCode;
    });
    console.log(msg);
    let msgValue =  this.otherReimbursementList.filter((item) => {
      return item.code === event.value;
    })[0];
     msg  = msg.filter((item) => {
      return item.reimbursementSubType === msgValue.code;
    })[0];
      this.messageService.showMessage(msg.message, 'Message', 'info-icon', 'OK');
    
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
      name = this.attachFiles[index] ? this.attachFiles[index].fileName.split('.')[0]: '';
     let obj = {
      sapCode: this.attachFiles[index].reimbursementType,
      claimNo: this.attachFiles[index].claimNumber,
      lineNo: this.attachFiles[index].lineNumber 
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
  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0){
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      });
    }
  }

  numericOnly(event, index, grp){
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
}
