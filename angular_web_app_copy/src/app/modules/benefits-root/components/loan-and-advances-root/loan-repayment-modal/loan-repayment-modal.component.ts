import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { BenefitsService } from '../../../services/benefits.service';
import { getYear, getMonth, getDaysInMonth, getDate } from 'date-fns';
import { DialogData } from '../loan-and-advances.component';
import { PdfViewerModalComponent } from '../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loan-repayment-modal',
  templateUrl: './loan-repayment-modal.component.html',
  styleUrls: ['./loan-repayment-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoanRepaymentModalComponent implements OnInit {
  todayDate: any;
  marriageRepayForm: FormGroup;
  selectedMode: any;
  headerData: any = [];
  loanEligibility = '';
  paymentMode = [];
  confirmationMsg: string;
  setMaxDate: any;
  loanBalance: string;
  attachmentList: any = [];
  editFlag: boolean;
  editandViewData: any;
  isView: boolean = false;
  lineNumber: any;
  refrenceNumber: any;
  subscriptionList: Subscription[] = [];
  displayFiles: any[] = [];
  attachedFiles: any[] = [];
  valueChange: boolean = false;
  deletelineNumber: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private benefitsService: BenefitsService,
    public messageService: MessageModalService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.deletelineNumber = '';
    this.editandViewData = this.data.editObj;
    this.disableFutureDates();

    let viewMode = false;
    if (this.editandViewData.actionType == 'view') {
      console.log(this.editandViewData.data.chequeDate);
      this.isView = true;
      viewMode = true;
      this.loanEligibility = this.editandViewData.data.loanEligibilty;
      let modeData = this.editandViewData.data.marriageLoanHeader.results;

      let setEditAttach = '';
      let loanfor = '';
      this.displayFiles = [];
      if (
        this.editandViewData.data.marriageLoanAttachment.results['0']
          .fileName != 'undefined' &&
        this.editandViewData.data.marriageLoanAttachment.results['0']
          .fileName != null
      ) {
        this.lineNumber = this.editandViewData.data.marriageLoanAttachment.results[
          '0'
        ].lineNumber;
        this.refrenceNumber = this.editandViewData.data.referenceNumber;

        setEditAttach =
          this.editandViewData.data.marriageLoanAttachment.results['0']
            .fileName + '.pdf';
        let obj = {
          name: setEditAttach,
        };
        this.displayFiles.push([obj]);

        this.loanEligibility = this.editandViewData.data.loanEligibilty;
        loanfor = this.data.editObj.data.marriageLoanHeader.results['0']
          .objectId;
      } else {
        this.displayFiles.push([]);
      }

      modeData = modeData.filter((item) => item.modeofRepayCode !== '');
      this.paymentMode = modeData;

      this.marriageRepayForm = new FormGroup({
        loanBalance: new FormControl(
          {
            value: this.editandViewData.data.loanEligibilty,
            disabled: viewMode,
          },
          Validators.required
        ),
        repaymentAmount: new FormControl(
          { value: this.editandViewData.data.loanAmount, disabled: viewMode },
          Validators.required
        ),
        modeOfPayment: new FormControl(
          {
            value: this.editandViewData.data.marriageLoanHeader.results[0]
              .modeofRepayCode,
            disabled: viewMode,
          },
          Validators.required
        ),
        attachment: new FormControl({
          value: this.editandViewData.data.marriageLoanAttachment
            ? this.editandViewData.data.marriageLoanAttachment.results[0]
                .fileName + '.pdf'
            : '',
          disabled: viewMode,
        }),
        chequeNo: new FormControl(
          {
            value:
              this.editandViewData.data.chequeNumber != ''
                ? this.editandViewData.data.chequeNumber
                : '',
            disabled: viewMode,
          },
          Validators.required
        ),
        bankName: new FormControl(
          {
            value:
              this.editandViewData.data.bankName != ''
                ? this.editandViewData.data.bankName
                : '',
            disabled: viewMode,
          },
          Validators.required
        ),
        bankBranch: new FormControl(
          {
            value:
              this.editandViewData.data.bankBranch != ''
                ? this.editandViewData.data.bankBranch
                : '',
            disabled: viewMode,
          },
          Validators.required
        ),
        chequeDate: new FormControl(
          {
            value:
              this.editandViewData.data.chequeDate != null
                ? new Date(this.editandViewData.data.chequeDate)
                : '',
            disabled: viewMode,
          },
          Validators.required
        ),
      });
    } else if (this.editandViewData.actionType == 'preclosure') {
      this.getpreclosure();
      this.marriageRepayForm = new FormGroup({
        loanBalance: new FormControl('', Validators.required),
        repaymentAmount: new FormControl('', Validators.required),
        modeOfPayment: new FormControl('', Validators.required),
        attachment: new FormControl(''),
      });

      this.marriageRepayForm.addControl(
        'chequeNo',
        new FormControl('', Validators.required)
      );
      this.marriageRepayForm.addControl(
        'bankName',
        new FormControl('', Validators.required)
      );
      this.marriageRepayForm.addControl(
        'bankBranch',
        new FormControl('', Validators.required)
      );
      this.marriageRepayForm.addControl(
        'chequeDate',
        new FormControl('', Validators.required)
      );
    } else if (this.editandViewData.actionType == 'edit') {
      this.isView = false;
      viewMode = false;
      let modeData = this.editandViewData.data.marriageLoanHeader.results;
      let setEditAttach = '';
      this.displayFiles = [];
      let loanfor;
      if (
        this.editandViewData.data.marriageLoanAttachment.results['0']
          .fileName != 'undefined' &&
        this.editandViewData.data.marriageLoanAttachment.results['0']
          .fileName != null
      ) {
        this.lineNumber = this.editandViewData.data.marriageLoanAttachment.results[
          '0'
        ].lineNumber;
        this.refrenceNumber = this.editandViewData.data.referenceNumber;

        setEditAttach =
          this.editandViewData.data.marriageLoanAttachment.results['0']
            .fileName + '.pdf';
        let obj = {
          name: setEditAttach,
        };
        this.displayFiles.push([obj]);

        this.loanEligibility = this.editandViewData.data.loanEligibilty;
        loanfor = this.data.editObj.data.marriageLoanHeader.results['0']
          .objectId;
      } else {
        this.displayFiles.push([]);
      }
      modeData = modeData.filter((item) => item.modeofRepayCode !== '');
      this.paymentMode = modeData;

      this.loanEligibility = this.editandViewData.data.loanEligibilty;
      this.marriageRepayForm = new FormGroup({
        loanBalance: new FormControl(
          {
            value: this.editandViewData.data.loanEligibilty,
            disabled: viewMode,
          },
          Validators.required
        ),
        repaymentAmount: new FormControl(
          { value: this.editandViewData.data.loanAmount, disabled: viewMode },
          Validators.required
        ),
        modeOfPayment: new FormControl(
          {
            value: this.editandViewData.data.marriageLoanHeader.results[1]
              .modeofRepayCode,
            disabled: viewMode,
          },
          Validators.required
        ),
        attachment: new FormControl({
          value: this.editandViewData.data.marriageLoanAttachment
            ? this.editandViewData.data.marriageLoanAttachment.results[0]
                .fileName + '.pdf'
            : '',
          disabled: viewMode,
        }),
        chequeNo: new FormControl(
          {
            value:
              this.editandViewData.data.chequeNumber != ''
                ? this.editandViewData.data.chequeNumber
                : '',
            disabled: viewMode,
          },
          Validators.required
        ),
        bankName: new FormControl(
          {
            value:
              this.editandViewData.data.bankName != ''
                ? this.editandViewData.data.bankName
                : '',
            disabled: viewMode,
          },
          Validators.required
        ),
        bankBranch: new FormControl(
          {
            value:
              this.editandViewData.data.bankBranch != ''
                ? this.editandViewData.data.bankBranch
                : '',
            disabled: viewMode,
          },
          Validators.required
        ),
        chequeDate: new FormControl(
          {
            value:
              this.editandViewData.data.chequeDate != null
                ? new Date(this.editandViewData.data.chequeDate)
                : '',
            disabled: viewMode,
          },
          Validators.required
        ),
      });
    }
  }

  getpreclosure() {
    this.benefitsService
      .getMarriageRepayHeader('0078', 'EC', ' ')
      .subscribe((data) => {
        debugger;
        this.headerData = data;
        if (this.headerData) {
          debugger;
          this.loanEligibility = this.headerData.loanEligibilty;
          this.loanBalance = this.headerData.loanEligibilty;
          let modeData = this.headerData.marriageLoanHeader.results;

          modeData = modeData.filter((item) => item.modeofRepayCode !== '');
          this.paymentMode = modeData;
          //   if (this.headerData.marriageLoanHeader.results.length != 0) {
          //     for (let i = 0; i < this.headerData.marriageLoanHeader.results.length; i++) {
          //       this.paymentMode.push(this.headerData.marriageLoanHeader.results[i]);
          //     }
          //   }
        }
      });
  }

  openPdf(data: any, index: number): void {
    let name = '';
    if (data.imageUrlClicked) {
      name = data.fileClicked.name.split('.')[0];
      this.onViewPdf(data.fileClicked, name);
    } else {
      name = this.attachedFiles[0]
        ? this.attachedFiles[0].fileName.split('.')[0]
        : '';

      this.subscriptionList.push(
        this.benefitsService
          .getpdf('0078', 'EV', this.refrenceNumber, this.lineNumber)
          .subscribe(
            (data: any) => {
              if (data) {
                this.onViewPdf(data, name);
              } else {
                this.openErrorPopup();
              }
            },
            (error) => {
              this.openErrorPopup();
            }
          )
      );
    }
  }
  openErrorPopup(): void {
    this.messageService.showMessage(
      'Error in loading attchment, Please try again',
      'Error',
      'warning-icon',
      'CLOSE'
    );
  }
  onViewPdf(data: any, name: string): void {
    let file = new Blob([data], { type: 'application/pdf' });
    let pdfUrl = URL.createObjectURL(file);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = pdfUrl;
    dialogRef.componentInstance.title = name;
    dialogRef.componentInstance.pdfName = name;
  }
  closeModal() {
    this.dialogRef.close();
  }

  disableFutureDates() {
    let year = getYear(new Date());
    let month = getMonth(new Date()) + 1;
    let todayDate = getDate(new Date());
    let endMonthValidationDt = year + ',' + month + ',' + todayDate;
    this.setMaxDate = new Date(endMonthValidationDt);
  }

  change(event) {
    if (event.isUserInput) {
      this.selectedMode = event.source.value;
    }
    // if (this.selectedMode == '0200') {
    // this.marriageRepayForm.addControl(
    //   'chequeNo',
    //   new FormControl('', Validators.required)
    // );
    // this.marriageRepayForm.addControl(
    //   'bankName',
    //   new FormControl('', Validators.required)
    // );
    // this.marriageRepayForm.addControl(
    //   'bankBranch',
    //   new FormControl('', Validators.required)
    // );
    // this.marriageRepayForm.addControl(
    //   'chequeDate',
    //   new FormControl('', Validators.required)
    // );
    // } else if (this.selectedMode == '0250') {
    //   this.marriageRepayForm.get('chequeNo').patchValue('');
    //   // this.marriageRepayForm.get('chequeNo').setValue('');
    //   this.marriageRepayForm.get('bankName').setValue('');
    //   this.marriageRepayForm.get('bankBranch').setValue('');
    //   this.marriageRepayForm.get('chequeDate').setValue('');
    // }
  }

  checkLength(event, maxChar: number) {
    let eventValue = event.target.value;
    if (eventValue.length !== maxChar) {
      this.marriageRepayForm.get('chequeNo').setValue('');
      this.messageService.showMessage(
        'Cheque no./DD must be 6 Digits Only',
        'Error',
        'warning-icon',
        'Ok'
      );
    }
  }

  openConfirm() {
    this.confirmationMsg =
      this.marriageRepayForm.get('repaymentAmount').value != '0200'
        ? 'Amount will be recovered from your Salary. If loan repayment amount is more than monthly net salary, the balance amount will be recovered in subsequent months.Are you sure?'
        : 'Are you sure , you want to save?';
    this.messageService.showConfirmation(
      this.confirmationMsg,
      'Confirmation',
      'confirmation-icon',
      (reason) => {
        if (reason === 'YES') {
          if (this.editandViewData.actionType == 'edit') {
            this.createPayLoad('', 'edit');
          } else {
            this.createPayLoad('', 'create');
          }
        }
      }
    );
  }

  setAlphaNumeric(event) {
    let alphaNumericVal = this.benefitsService.spacevalidation(event);
    if (alphaNumericVal) {
      let inputVal = event.target.value.slice(1, -1);
      this.marriageRepayForm.get(event.target.name).patchValue(inputVal);
    } else {
      if (this.benefitsService.setAlphaNumeric(event.target.value, true)) {
        let inputVal = event.target.value.slice(0, -1);
        this.marriageRepayForm.get(event.target.name).patchValue(inputVal);
      }
    }
  }
  repaymentValidation(event) {
    let eventValue = event.target.value;
    if (eventValue > this.loanBalance) {
      this.marriageRepayForm.get('repaymentAmount').setValue('');
      this.messageService.showMessage(
        'Repayment Amount should not be greater than Loan Balance',
        'Error',
        'warning-icon',
        'error-popup'
      );
    }
  }

  createPayLoad(index, opr) {
    let actionCode = '';
    let refNo = '';

    if (opr == 'edit') {
      actionCode = 'EE';
      refNo = this.refrenceNumber;
    } else {
      actionCode = 'EC';
      refNo = '';
    }

    let payload = {
      loanEligibility: this.loanEligibility,
      loanAmount: this.marriageRepayForm.get('repaymentAmount').value,
      requestType: '0078',
      action: actionCode,
      referenceNumber: refNo,
      individualDetails: [
        {
          paymentModeCode: this.marriageRepayForm.get('modeOfPayment').value,
          paymentModeText: '',
        },
      ],
    };

    if (this.marriageRepayForm.get('modeOfPayment').value === '0200') {
      payload['chequeNumber'] = this.marriageRepayForm.get('chequeNo').value;
      (payload['chequeDate'] = new Date(
        this.marriageRepayForm.value.chequeDate
      ).getTime()),
        (payload['bankName'] = this.marriageRepayForm.get('bankName').value);
      payload['bankBranch'] = this.marriageRepayForm.get('bankBranch').value;
    }

    //Create Service -> Loan Repayment
    this.benefitsService
      .createMarriageLoan(payload, this.attachmentList, this.deletelineNumber)
      .subscribe(
        (data: any) => {
          if (data.systemErrMsg) {
            this.messageService.showMessage(
              data.systemErrMsg,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          } else if (data.responseStatus == 'SUCCESS') {
            this.valueChange = true;
            let message;
            this.editFlag
              ? (message = 'Repayment changed successfully')
              : (message = 'Repayment created successfully');
            this.messageService.showMessage(
              message,
              'Success',
              'success-icon',
              'CLOSE',
              () => this.dialogRef.close(this.valueChange)
            );
          }
        },
        (error) => {
          console.log('error');
        }
      );
  }

  deleteFile(data: any) {
    this.marriageRepayForm
      .get('attachment')
      .setValue('', { emitModelToViewChange: false });
    this.marriageRepayForm.get('attachment').updateValueAndValidity();
    this.deletelineNumber =
      this.editandViewData.data != ''
        ? this.editandViewData.data.marriageLoanAttachment.results[0].lineNumber
        : '';

    this.attachmentList = [];
  }

  //FIle Handler
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  prepareFilesList(files: Array<any>) {
    this.attachmentList = [];
    if (files.length > 0) {
      this.attachmentList.push(files[0]);
    }
  }
}
