import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from '../../../services/benefits.service';

@Component({
  selector: 'app-assistance-request-modal',
  templateUrl: './assistance-request-modal.component.html',
  styleUrls: ['./assistance-request-modal.component.css'],
})
export class AssistanceRequestModalComponent implements OnInit, OnDestroy {
  educationForm: FormGroup;
  choosenFiles: any = [];
  dropdownData: Object;
  isEdit = false;
  subManager: Subscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private educationApi: BenefitsService,
    private activeModal: MatDialog,
    private messageModalService: MessageModalService,
    public dialogRef: MatDialogRef<AssistanceRequestModalComponent>
  ) {}

  ngOnInit(): void {
    this.educationForm = new FormGroup({
      assistanceType: new FormControl('', Validators.required),
      courseName: new FormControl('', Validators.required),
      instituteName: new FormControl('', Validators.required),
      courseType: new FormControl('', Validators.required),
      courseDuration: new FormControl('', Validators.required),
      tutionFees: new FormControl('', Validators.required),
      booksCost: new FormControl('', Validators.required),
    });
    this.checkFormData();
    this.educationForm
      .get('assistanceType')
      .valueChanges.subscribe((change) => {
        this.getDropdownData(change);
      });
    this.isEdit = this.data.editFlag;
  }

  checkFormData() {
    if (this.data.educationData.length != 0) {
      this.educationForm
        .get('assistanceType')
        .patchValue(this.data.educationData.requestType);
      this.educationForm
        .get('courseName')
        .patchValue(this.data.educationData.courseName);
      this.educationForm
        .get('instituteName')
        .patchValue(this.data.educationData.institute);
      this.educationForm
        .get('courseType')
        .patchValue(this.data.educationData.courseType);
      this.educationForm
        .get('courseDuration')
        .patchValue(this.data.educationData.duration);
      this.educationForm
        .get('tutionFees')
        .patchValue(this.data.educationData.tutionFee);
      this.educationForm
        .get('booksCost')
        .patchValue(this.data.educationData.bookFee);
    } else {
      this.educationForm.get('assistanceType').patchValue('SD');
    }
    this.getDropdownData(this.educationForm.value.assistanceType);
  }

  getDropdownData(value) {
    let dropdownSub = this.educationApi
      .getEducationDropdown(value)
      .subscribe((data) => {
        this.dropdownData = data;
      });
    this.subManager.add(dropdownSub);
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  downloadPolicy(requestType) {
    let dowloadPolicySub = this.educationApi
      .downloadPolicyDoc(requestType)
      .subscribe(
        (data) => {
          let blob: Blob = data;
          let blobUrl = URL.createObjectURL(blob);
          let downloadAnchor = document.createElement('a');
          downloadAnchor.style.display = 'none';
          downloadAnchor.href = blobUrl;
          downloadAnchor.download = 'Policy_Document.pdf';
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          document.body.removeChild(downloadAnchor);
        },
        (error) => {
          this.messageModalService.showMessage(
            'Something went wrong. Please try again later.',
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      );
    this.subManager.add(dowloadPolicySub);
  }

  viewAttachmentPdf(event) {
    if (this.choosenFiles.length != 0) {
      let pdfUrl = URL.createObjectURL(event.fileClicked);
      const dialogRef = this.activeModal.open(PdfViewerModalComponent);
      dialogRef.componentInstance.pdfUrl = pdfUrl;
      dialogRef.componentInstance.title = event.fileClicked.name;
      dialogRef.componentInstance.pdfName = event.fileClicked.name;
    } else {
      let viewAttachmentSub = this.educationApi
        .viewAttachments(this.data.existingDocs[0].documentNumber)
        .subscribe(
          (data) => {
            let blob = new Blob([data], { type: 'application/pdf' });
            let blobUrl = URL.createObjectURL(blob);
            const dialogRef = this.activeModal.open(PdfViewerModalComponent);
            dialogRef.componentInstance.pdfUrl = blobUrl;
            dialogRef.componentInstance.title = event.fileClicked.name;
            dialogRef.componentInstance.pdfName = event.fileClicked.name;
          },
          (error) => {
            this.messageModalService.showMessage(
              'Something went wrong. Please try again later.',
              'Error',
              'warning-icon',
              'CLOSE'
            );
          }
        );
      this.subManager.add(viewAttachmentSub);
    }
  }

  uploadFiles(event) {
    this.choosenFiles = event.files;
  }

  validateNumberLen(event, maxNum) {
    if (event.target.value.length > maxNum) {
      event.target.value = event.target.value.slice(0, maxNum);
    }
    if (event.target.value < 0) {
      event.target.value = 0;
    }
  }

  submitForm() {
    let payload = {
      requestType: this.educationForm.value.assistanceType,
      courseName: this.educationForm.value.courseName,
      institute: this.educationForm.value.instituteName,
      courseType: this.educationForm.value.courseType,
      duration: this.educationForm.value.courseDuration,
      tutionFee: this.educationForm.value.tutionFees,
      bookFee: this.educationForm.value.booksCost,
      insuranceAmount: 0,
      action: this.isEdit ? 'E' : 'C',
    };
    let submitCreationSub = this.educationApi
      .createEducationRequest(this.isEdit, payload, this.choosenFiles)
      .subscribe(
        (data) => {
          this.messageModalService.showMessage(
            'The request was created successfully.',
            'Success',
            'success-icon',
            'CLOSE',
            () => {
              this.dialogRef.close('S');
            }
          );
        },
        (error) => {
          this.messageModalService.showMessage(
            'Something went wrong. Please try again later.',
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      );
    this.subManager.add(submitCreationSub);
  }
}
