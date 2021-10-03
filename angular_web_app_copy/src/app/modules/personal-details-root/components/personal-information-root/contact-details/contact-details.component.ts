import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IconsModel } from 'src/app/components/common/common-models';
import { ContactDetailsEditComponent } from '../../contact-details-root/contact-details-edit/contact-details-edit.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  iconsSub: any;

  constructor(public dialog: MatDialog) {
    this.iconsSub = [];
    this.iconsSub.push(new IconsModel('', 'Edit', 'edit-ico ico-extra-small', 'edit'));
   }

  ngOnInit(): void {
  }

  editContactModal() {
    const dialogRef = this.dialog.open(ContactDetailsEditComponent, 
    {width: '600px',}); 
  }

}
