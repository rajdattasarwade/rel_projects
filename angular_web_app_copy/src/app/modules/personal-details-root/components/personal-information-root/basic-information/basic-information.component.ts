import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IconsModel } from 'src/app/components/common/common-models';
import { CustomToastSnackbarComponent } from 'src/app/components/shared/custom-toast-snackbar/custom-toast-snackbar.component';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BasicInformationComponent implements OnInit {

  iconsSub: any;
  constructor( private router: Router,private _snackBar: MatSnackBar) {
    this.iconsSub = [];
    this.iconsSub.push(new IconsModel('', 'Edit', 'edit-ico ico-extra-small', 'edit'));
   }

  ngOnInit(): void {
    // this.openSnackBar();
  }

  openSnackBar() {
    let message = 
      'The following fields are submitted for approval to the HRBP: Last Name, Martial Status, Since Date. The form can be edited only after the review of your HRBP.';
    this._snackBar.openFromComponent(CustomToastSnackbarComponent, {
      duration: 5000,
      panelClass: ['info-outline-snackbar'],
      data: {
        title: 'Info',
        message: message
      },
    });
  }

  actionEventMain(event) {
    if (event == 'edit') {
      this.router.navigate(['/personal-details/basic-information']);
    }
  }

}
