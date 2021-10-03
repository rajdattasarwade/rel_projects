import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UanDetailsEditComponent } from './uan-details-edit/uan-details-edit.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MultiAttachPdfComponent } from '../../../../../components/shared/multi-attach-pdf/multi-attach-pdf.component';
import { IconsModel } from '../../../../../components/common/common-models';
@Component({
  selector: 'app-pan-card-edit',
  templateUrl: './pan-card-edit.component.html',
  styleUrls: ['./pan-card-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PanCardEditComponent implements OnInit {
  showDetails: boolean = false;

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
      label: 'Pan Card',
      link: '/personal-details/pan-card-details',
    },
  ];
  iconsMain: any[];

  constructor(public dialog: MatDialog) {
    this.iconsMain = [];
    this.iconsMain.push(new IconsModel('', '', 'header-ico info_ico', 'info'));
  }

  ngOnInit(): void {}
  panCardToggle() {
    this.showDetails = !this.showDetails;
  }
  panDetailsForm = new FormGroup({
    panIdNo: new FormControl('', Validators.required),
    remarkText: new FormControl('', Validators.required),
  });
  actionEventSub(event) {
    if (event == 'info') {
      this.dialog.open(MultiAttachPdfComponent, {
        width: '600px',
      });
    }
  }
  openFormEleven() {
    const dialogRef = this.dialog.open(UanDetailsEditComponent, {
      width: '800px',
    });
  }
}
