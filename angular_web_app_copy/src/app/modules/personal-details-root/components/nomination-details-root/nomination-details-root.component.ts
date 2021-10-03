import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconsModel } from '../../../../components/common/common-models';
import { PdfViewerModalComponent } from '../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { CustomToastSnackbarComponent } from '../../../../components/shared/custom-toast-snackbar/custom-toast-snackbar.component';

@Component({
  selector: 'app-nomination-details-root',
  templateUrl: './nomination-details-root.component.html',
  styleUrls: ['./nomination-details-root.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NominationDetailsRootComponent implements OnInit {

  iconsMain: any;
  iconsSub: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.iconsMain = [];
    this.iconsMain.push(new IconsModel('add', 'Add', '', 'create'));

    this.iconsSub = [];
    this.iconsSub.push(new IconsModel('remove_red_eye', 'View', '', 'view'));
    this.iconsSub.push(new IconsModel('print', 'Print', '', 'print'));
  }

  ngOnInit(): void {
    // this.openSnackBar();
  }

  openSnackBar() {
    let message = 'Your Details have been sent to HRBP for Validation';
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
    if (event == 'create') {
      this.routeToNominations();
    }
  }

  actionEventSub(event) {
    if (event == 'view') {
      this.routeToNominations();
    } else if (event == 'print') {
      this.dialog.open(PdfViewerModalComponent);
    }
  }

  routeToNominations() {
    this.router.navigate(['/personal-details/nominations']);
  }

}
