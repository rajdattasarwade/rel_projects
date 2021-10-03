import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CustomToastSnackbarComponent } from '../../../../../components/shared/custom-toast-snackbar/custom-toast-snackbar.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconsModel } from '../../../../../components/common/common-models';
import { MultiAttachPdfComponent } from '../../../../../components/shared/multi-attach-pdf/multi-attach-pdf.component';

@Component({
  selector: 'app-visa-details-edit',
  templateUrl: './visa-details-edit.component.html',
  styleUrls: ['./visa-details-edit.component.css'],
})
export class VisaDetailsEditComponent implements OnInit {
  breadcrumbJson: any = [
    {
      label: 'Personal Details',
      link: '/personal-details',
    },
    {
      label: 'Personal Id',
      link: '/personal-details/personal-id',
    },
    {
      label: 'Visa',
      link: '/personal-details/visa-details',
    },
  ];
  iconsMain: any[];

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.iconsMain = [];
    this.iconsMain.push(new IconsModel('', '', 'header-ico info_ico', 'info'));
  }

  ngOnInit(): void {}
  
  visaForm = new FormGroup({
    visaIdNo: new FormControl('', Validators.required),
    issuingAuthority: new FormControl('', Validators.required),
    caseVerificationNo: new FormControl('', Validators.required),
    issueDate: new FormControl('', Validators.required),
    expiryDate: new FormControl('', Validators.required),
  });
  
  actionEventSub(event) {
    if (event == 'info') {
      this.dialog.open(MultiAttachPdfComponent, {
        width: '600px',
      });
    }
  }

  onSubmit() {
    if (this.visaForm.invalid) {
      return;
    } else {
      this.router.navigate(['/personal-details']).then(() => {
        let message = 'Information send to the map HRBP approval';
        this._snackBar.openFromComponent(CustomToastSnackbarComponent, {
          duration: 10000,
          panelClass: ['info-outline-snackbar'],
          data: {
            title: 'Info',
            message: message,
          },
        });
      });
    }
  }
}
