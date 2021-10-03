import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-accident-repair-soho-allowance',
  templateUrl: './accident-repair-soho-allowance.component.html',
  styleUrls: ['./accident-repair-soho-allowance.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccidentRepairSohoAllowanceComponent implements OnInit {

  reimbursementType = "SOHO Allowance";
  
  //This form is valid for following reimbursement types
  // reimbursementTypes = [
  //   "SOHO Allowance", 
  //   "Accident Repair", 
  // ];

  constructor(
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
