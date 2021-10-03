import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconsModel } from '../../../../../components/common/common-models';
import { CustomToastSnackbarComponent } from '../../../../../components/shared/custom-toast-snackbar/custom-toast-snackbar.component';
import { MultiAttachPdfComponent } from '../../../../../components/shared/multi-attach-pdf/multi-attach-pdf.component';

@Component({
  selector: 'app-driving-license-edit',
  templateUrl: './driving-license-edit.component.html',
  styleUrls: ['./driving-license-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DrivingLicenseEditComponent implements OnInit {
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
      label: 'Driving License',
      link: '/personal-details/aadhar-card-details',
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

  drvinngLicenseForm = new FormGroup({
    licenseType: new FormControl('', Validators.required),
    licenseNumber: new FormControl('', Validators.required),
    issuingAut: new FormControl('', Validators.required),
    issueDate: new FormControl('', Validators.required),
    expiryDate: new FormControl('', Validators.required),
    placeOfIssue: new FormControl('', Validators.required),
    countrOfIssue: new FormControl('', Validators.required),
  });

  actionEventSub(event) {
    if (event == 'info') {
      this.dialog.open(MultiAttachPdfComponent, {
        width: '600px',
      });
    }
  }

  onSubmitForm() {
    if (this.drvinngLicenseForm.invalid) {
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
