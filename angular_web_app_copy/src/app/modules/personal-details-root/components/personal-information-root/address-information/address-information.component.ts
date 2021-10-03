import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IconsModel } from '../../../../../components/common/common-models';
import { AddressInformationEditComponent } from './address-information-edit/address-information-edit.component';

@Component({
  selector: 'app-address-information',
  templateUrl: './address-information.component.html',
  styleUrls: ['./address-information.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddressInformationComponent implements OnInit {

  iconsSub: any;

  constructor(public dialog: MatDialog) {
    this.iconsSub = [];
    this.iconsSub.push(new IconsModel('', 'Edit', 'edit-ico ico-extra-small', 'edit'));
  }
  

  ngOnInit() {
  }

  editAddressModal() {
    const dialogRef = this.dialog.open(AddressInformationEditComponent, 
    {width: '600px',}); 
  }

}
