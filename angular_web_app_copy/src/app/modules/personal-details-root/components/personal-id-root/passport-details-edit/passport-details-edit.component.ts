import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomToastSnackbarComponent } from '../../../../../components/shared/custom-toast-snackbar/custom-toast-snackbar.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconsModel } from '../../../../../components/common/common-models';
import { MatDialog } from '@angular/material/dialog';
import { MultiAttachPdfComponent } from '../../../../../components/shared/multi-attach-pdf/multi-attach-pdf.component';

@Component({
  selector: 'app-passport-details-edit',
  templateUrl: './passport-details-edit.component.html',
  styleUrls: ['./passport-details-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PassportDetailsEditComponent implements OnInit {
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
      label: 'Passport',
      link: '/personal-details/passport-details',
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

  passportDetailsForm = new FormGroup({
    passportNo: new FormControl('', Validators.required),
    nameOnPassport: new FormControl('', Validators.required),
    issuingAuthority: new FormControl('', Validators.required),
    issueDate: new FormControl('', Validators.required),
    expirationDate: new FormControl('', Validators.required),
  });

  actionEventSub(event) {
    if (event == 'info') {
      this.dialog.open(MultiAttachPdfComponent, {
        width: '600px',
      });
    }
  }

  onSubmit() {
    if (this.passportDetailsForm.invalid) {
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
