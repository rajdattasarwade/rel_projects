import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-subordinate-modal',
  templateUrl: './remove-subordinate-modal.component.html',
  styleUrls: ['./remove-subordinate-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RemoveSubordinateModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemoveSubordinateModalComponent>
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
