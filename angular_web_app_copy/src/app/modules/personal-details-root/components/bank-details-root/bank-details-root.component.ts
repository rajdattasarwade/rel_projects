import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IconsModel } from 'src/app/components/common/common-models';
import { CustomToastSnackbarComponent } from 'src/app/components/shared/custom-toast-snackbar/custom-toast-snackbar.component';

@Component({
  selector: 'app-bank-details-root',
  templateUrl: './bank-details-root.component.html',
  styleUrls: ['./bank-details-root.component.css']
})
export class BankDetailsRootComponent implements OnInit {

  iconsMain: any;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar
  ) { 
    this.iconsMain = [];
    this.iconsMain.push(new IconsModel('', 'Edit', 'ico-extra-small edit-white-ico', 'edit'));
  }

  ngOnInit(): void {
    // this.openSnackBar();
  }
  openSnackBar() {
    let message = 
      'Your Manager Validation is pending with the HRBP. Once Validated, Your Old Manager’s name will removed.<br><br>'
      + 'New Subordinate addition pending with HRBP.';
    this._snackBar.openFromComponent(CustomToastSnackbarComponent, {
      duration: 10000,
      panelClass: ['info-outline-snackbar'],
      data: {
        title: 'Info',
        message: message
      },
    });
  }

  actionEventMain(event) {
    if (event == 'edit') {
      this.router.navigate(['/personal-details/bank-details']);
    }
  }

}
