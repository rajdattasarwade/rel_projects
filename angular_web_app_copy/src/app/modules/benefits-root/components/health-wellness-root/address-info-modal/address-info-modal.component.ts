import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-address-info-modal',
  templateUrl: './address-info-modal.component.html',
  styleUrls: ['./address-info-modal.component.css'],
})
export class AddressInfoModalComponent implements OnInit {
  @Input() title;
  @Input() address;
  teamDataString: string[] = [];
  constructor(private dialog: MatDialogRef<AddressInfoModalComponent>) {}

  ngOnInit(): void {
    for (let each of this.address) this.teamDataString.push(each['address']);
  }
  dismiss() {
    this.dialog.close();
  }
}
