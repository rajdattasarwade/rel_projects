import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomToastSnackbarComponent } from '../../../../../components/shared/custom-toast-snackbar/custom-toast-snackbar.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MultiAttachPdfComponent } from '../../../../../components/shared/multi-attach-pdf/multi-attach-pdf.component';
import { IconsModel } from '../../../../../components/common/common-models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-aadhar-details-edit',
  templateUrl: './aadhar-details-edit.component.html',
  styleUrls: ['./aadhar-details-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AadharDetailsEditComponent implements OnInit {
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
      label: 'Aadhar Card',
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

  aadharDetailsForm = new FormGroup({
    aadharNo: new FormControl('', Validators.required),
    aadhaarName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
  });

  // get aadharNo(){
  //   return this.aadharDetailsForm.get('aadharNo');
  // }

  actionEventSub(event) {
    if (event == 'info') {
      this.dialog.open(MultiAttachPdfComponent, {
        width: '600px',
      });
    }
  }

  onSubmit() {
    if (this.aadharDetailsForm.invalid) {
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
