import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '../../../../../../../../../../node_modules/@angular/material/dialog';
import { WithdrawalService } from '../../withdrawal.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-withdrawal-terms-popup',
  templateUrl: './withdrawal-terms-popup.component.html',
  styleUrls: ['./withdrawal-terms-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WithdrawalTermsPopupComponent implements OnInit {

  displayedColumns: any = ['sr_no','withdrawal_type','no_of_months'];
  dataSource =new MatTableDataSource([])

  constructor(
    public dialogRef: MatDialogRef<WithdrawalTermsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public withdrawalServices: WithdrawalService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.dataSource=new MatTableDataSource(this.data)
  }

  closeModal() {
    this.dialogRef.close();
  }

}
