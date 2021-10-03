import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BenefitsService } from '../../../services/benefits.service';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { getYear, getMonth, getDaysInMonth, getDate } from 'date-fns';
import { DialogData } from '../loan-and-advances.component';
import { Subscription } from 'rxjs';
//'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { PdfViewerModalComponent } from '../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
@Component({
  selector: 'app-marriage-loan-modal',
  templateUrl: './marriage-loan-modal.component.html',
  styleUrls: ['./marriage-loan-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MarriageLoanModalComponent implements OnInit {
  loanForList = [];
  loanEligibility = '';
  headerData: any = [];
  saveDisable: boolean = false;
  marriageLoanForm: FormGroup;
  form: FormArray;
  counter = 1;
  confirmationMsg: string;
  attachedFiles: any[] = [];
  attachmentList: any = [];
  selectedValue: string;
  editFlag: any;
  setMaxDate: any;
  checked: boolean = false;
  valueChange: boolean = false;
  editandViewData: any;
  isView: boolean;

  subscriptionList: Subscription[] = [];
  displayFiles: any[] = [];
  editClaimObj: any;
  lineNumber: any;
  refrenceNumber: any;
  deletelineNumber: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private benefitsService: BenefitsService,
    public messageService: MessageModalService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    let viewMode = false;
    this.editFlag = '';
    this.deletelineNumber = '';

    this.editandViewData = this.data.editObj;
    if (this.editandViewData.actionType == 'view') {
      this.isView = true;
      viewMode = true;

      this.loanForList = this.editandViewData.data.marriageLoanHeader.results;

      let setEditAttach = '';
      let loanfor = '';
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

      console.log('setEditAttach' + setEditAttach);
      this.marriageLoanForm = new FormGroup({
        marriageDate: new FormControl(
          {
            value: new Date(this.editandViewData.data.marriageDate),
            disabled: viewMode,
          },
          [Validators.required]
        ),
        // loanEligibility: new FormControl("", [Validators.required]),
        loanAmount: new FormControl(
          { value: this.editandViewData.data.loanAmount, disabled: viewMode },
          [Validators.required, Validators.min(1)]
        ),
        emi: new FormControl(
          { value: this.editandViewData.data.emi, disabled: viewMode },
          Validators.required
        ),
        loanFor: new FormControl(
          { value: loanfor, disabled: viewMode },
          Validators.required
        ),
        attachment: new FormControl(
          { value: setEditAttach },
          Validators.required
        ),
      });
    } else if (this.editandViewData.actionType == 'edit') {
      this.editFlag = 'edit';
      let loanfor = '';
      this.isView = false;
      viewMode = false;
      this.loanForList = this.editandViewData.data.marriageLoanHeader.results;

      this.loanForList = this.loanForList.filter(
        (item) => item.objectId !== ''
      );
      this.loanForList = this.loanForList;

      loanfor = this.loanForList['0'].objectId;
      let setEditAttach = '';

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
      } else {
        this.displayFiles.push([]);
      }

      this.marriageLoanForm = new FormGroup({
        marriageDate: new FormControl(
          {
            value: new Date(this.editandViewData.data.marriageDate),
            disabled: viewMode,
          },
          [Validators.required]
        ),
        // loanEligibility: new FormControl("", [Validators.required]),
        loanAmount: new FormControl(
          { value: this.editandViewData.data.loanAmount, disabled: viewMode },
          [Validators.required, Validators.min(1)]
        ),
        emi: new FormControl(
          { value: this.editandViewData.data.emi, disabled: viewMode },
          Validators.required
        ),
        loanFor: new FormControl(
          { value: loanfor, disabled: viewMode },
          Validators.required
        ),
        attachment: new FormControl({
          value: setEditAttach,
          disabled: viewMode,
        }),
      });
    } else {
      this.editFlag = '';
      this.loanForDropDown();

      this.marriageLoanForm = new FormGroup({
        marriageDate: new FormControl('', [Validators.required]),
        // loanEligibility: new FormControl("", [Validators.required]),
        loanAmount: new FormControl('', [
          Validators.required,
          Validators.min(1),
        ]),
        emi: new FormControl('', Validators.required),
        loanFor: new FormControl('', Validators.required),
        attachment: new FormControl(''),
      });
    }

    this.disableFutureDates();
  }

  loanForDropDown() {
    //Marriage-Loan PreFilled Values
    this.benefitsService
      .getMarriageHeader('0045', 'EC', ' ')
      .subscribe((data) => {
        debugger;
        this.headerData = data;
        if (this.headerData) {
          this.loanEligibility = this.headerData.loanEligibilty;
          this.loanForList = this.headerData.marriageLoanHeader.results;
          // if (this.headerData.marriageLoanHeader.results.length != 0) {
          //   for (
          //     let i = 0;
          //     i < this.headerData.marriageLoanHeader.results.length;
          //     i++
          //   ) {
          //     this.loanForList.push(
          //       this.headerData.marriageLoanHeader.results[i]
          //     );
          //   }
          // }
        }
      });
  }

  closeModal() {
    this.dialogRef.close();
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
          .getpdf('0045', 'EV', this.refrenceNumber, this.lineNumber)
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
  disableFutureDates() {
    let year = getYear(new Date());
    let month = getMonth(new Date()) + 1;
    let todayDate = getDate(new Date());
    let endMonthValidationDt = year + ',' + month + ',' + todayDate;
    this.setMaxDate = new Date(endMonthValidationDt);
  }

  NumericValidation(event, index) {
    let bankNumericVal = this.benefitsService.spacevalidation(event);
    if (bankNumericVal) {
      let inputVal = event.target.value.slice(1, -1);
      // grp.get(event.target.name).patchValue(inputVal);
    } else {
      if (this.benefitsService.setNumeric(event.target.value)) {
        let inputVal = event.target.value.slice(0, -1);
        // grp.get(event.target.name).patchValue(inputVal);
      }
    }
  }

  loanAmountCheck(event) {
    let amount = event.target.value;
    amount = parseInt(amount);
    if (amount > this.loanEligibility) {
      this.messageService.showMessage(
        'Loan amount cannot be greater than Loan eligibility.',
        'Error',
        'warning-icon',
        'error-popup'
      );
      this.marriageLoanForm.get('loanAmount').setValue('');
    }
  }

  openConfirm() {
    this.confirmationMsg =
      '"Are you sure, you want to apply for marriage loan ?"';
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

  //FIle Handler
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  prepareFilesList(files: Array<any>) {
    if (files.length > 0) {
      this.attachmentList.push(files[0]);
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

    //Check applied whether loan-for is selected or not
    if (this.marriageLoanForm.get('loanFor').value == '') {
      this.messageService.showMessage(
        'Please select the value in Loan for drop down ',
        'Error',
        'warning-icon',
        'Ok'
      );
    } else {
      //Creating Payload
      let payload = {
        loanEligibility: this.loanEligibility,
        loanAmount: this.marriageLoanForm.value.loanAmount,
        emi: this.marriageLoanForm.value.emi,
        requestType: '0045',
        action: actionCode,
        referenceNumber: refNo,
        marriageDate: new Date(
          this.marriageLoanForm.value.marriageDate
        ).getTime(),
        individualDetails: [
          {
            objectId: this.marriageLoanForm.get('loanFor').value,
            name: '',
          },
        ],
      };

      this.benefitsService
        .createMarriageLoan(payload, this.attachmentList, this.deletelineNumber)
        .subscribe(
          (data: any) => {
            if (data.systemErrMsg) {
              let reg = new RegExp('^[0-9. ]*$');
              if (reg.test(data.systemErrMsg)) {
                let splitString = data.systemErrMsg.split(' ');
                let str1 = splitString[0];
                let str2 = splitString[1];
                this.messageService.showMessage(
                  'Marriage Date should be in between ' + str1 + ' and ' + str2,
                  'Error',
                  'warning-icon',
                  'CLOSE'
                );
              } else {
                this.messageService.showMessage(
                  data.systemErrMsg,
                  'Error',
                  'warning-icon',
                  'CLOSE'
                );
              }
            } else if (data.responseStatus == 'SUCCESS') {
              this.valueChange = true;
              let message;
              this.editFlag
                ? (message = 'Marriage loan changed successfully')
                : (message = 'Marriage loan created successfully');
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
  }

  deleteFile(data: any) {
    this.marriageLoanForm
      .get('attachment')
      .setValue('', { emitModelToViewChange: false });
    this.marriageLoanForm.get('attachment').updateValueAndValidity();
    this.deletelineNumber =
      this.editandViewData.data != ''
        ? this.editandViewData.data.marriageLoanAttachment.results[0].lineNumber
        : '';

    this.attachmentList = [];
  }

  changeValue(value) {
    this.checked = !value;
  }
}
