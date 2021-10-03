import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PdfViewerModalComponent } from '../../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-uan-details-edit',
  templateUrl: './uan-details-edit.component.html',
  styleUrls: ['./uan-details-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UanDetailsEditComponent implements OnInit {
  isEarlierMember: boolean = true;
  showDetails: boolean = false;

  constructor(public dialogRef: MatDialogRef<UanDetailsEditComponent>, public dialog: MatDialog) {}

  uanDetailsForm = new FormGroup({
    previousCompanyName: new FormControl('', Validators.required),
    previousCompanyAddress: new FormControl('', Validators.required),
    uanNo: new FormControl('', Validators.required),
    previousJoiningDate: new FormControl('', Validators.required),
    previousExitDate: new FormControl('', Validators.required),
    trustName: new FormControl('', Validators.required),
    trustAddress: new FormControl('', Validators.required),
    trustUAN: new FormControl('', Validators.required),
    trustJoiningDate: new FormControl('', Validators.required),
    trustExitDate: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }

  onSaveForm() {
    if (this.uanDetailsForm.invalid) {
      return;
    }else {
      this.dialog.open(PdfViewerModalComponent, {
        width: '600px',
      });
    }
  }

}

