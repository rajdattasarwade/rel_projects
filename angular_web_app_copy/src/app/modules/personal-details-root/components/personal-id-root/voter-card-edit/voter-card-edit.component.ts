import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CustomToastSnackbarComponent } from '../../../../../components/shared/custom-toast-snackbar/custom-toast-snackbar.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconsModel } from '../../../../../components/common/common-models';
import { MultiAttachPdfComponent } from '../../../../../components/shared/multi-attach-pdf/multi-attach-pdf.component';

@Component({
  selector: 'app-voter-card-edit',
  templateUrl: './voter-card-edit.component.html',
  styleUrls: ['./voter-card-edit.component.css'],
})
export class VoterCardEditComponent implements OnInit {
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
      label: 'Voter ID',
      link: '/personal-details/voter-cards-details',
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

  voterDetailsForm = new FormGroup({
    voterId: new FormControl('', Validators.required),
    remarkText: new FormControl('', Validators.required),
  });

  actionEventSub(event) {
    if (event == 'info') {
      this.dialog.open(MultiAttachPdfComponent, {
        width: '600px',
      });
    }
  }

  onSubmit() {
    if (this.voterDetailsForm.invalid) {
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
