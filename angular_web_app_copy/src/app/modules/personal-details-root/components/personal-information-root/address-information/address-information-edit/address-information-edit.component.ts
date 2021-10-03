import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrentWorkLocationComponent } from './current-work-location/current-work-location.component';

@Component({
  selector: 'app-address-information-edit',
  templateUrl: './address-information-edit.component.html',
  styleUrls: ['./address-information-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddressInformationEditComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editEditsModal() {
    const dialogRef = this.dialog.open(CurrentWorkLocationComponent, 
    {width: '800px',}); 
  }

}
