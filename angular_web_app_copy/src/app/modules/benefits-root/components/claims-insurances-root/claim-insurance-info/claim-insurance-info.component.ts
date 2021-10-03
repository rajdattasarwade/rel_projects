import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-claim-insurance-info',
  templateUrl: './claim-insurance-info.component.html',
  styleUrls: ['./claim-insurance-info.component.css']
})
export class ClaimInsuranceInfoComponent implements OnInit {

  constructor(public activeModal: MatDialog, public dialogRef: MatDialogRef<ClaimInsuranceInfoComponent>) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }

}
