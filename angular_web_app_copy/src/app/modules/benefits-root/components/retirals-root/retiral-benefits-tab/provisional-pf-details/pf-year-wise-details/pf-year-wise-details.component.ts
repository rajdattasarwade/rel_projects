import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PfMonthWiseDetailsComponent } from '../pf-month-wise-details/pf-month-wise-details.component';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RetiralsService } from '../../retirals.service';

@Component({
  selector: 'app-pf-year-wise-details',
  templateUrl: './pf-year-wise-details.component.html',
  styleUrls: ['./pf-year-wise-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PfYearWiseDetailsComponent implements OnInit {

  displayedColumns: any = ['year','managed_by','employee','employer','total'];
  dataSource =new MatTableDataSource([])
  public subscriptionsList: Subscription[] = [];
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PfYearWiseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private retiralService:RetiralsService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.getYearWiseDetails()
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }
  closeModal() {
    this.dialogRef.close();
  }

  openMonthWiseDetails(element) {
    this.dialog.open(PfMonthWiseDetailsComponent, {
      width: '800px',
      data:element
    });
  }
getYearWiseDetails(){
  this.subscriptionsList.push(this.retiralService.getProvidentYearSummary(this.data).subscribe((data:any)=>{
    console.log(data)
    if(data.length>0){
    for(let i=0;i<data.length;i++){
      data[i].employeeContribution=Number(data[i].employeeContribution).toLocaleString('en-US',{minimumFractionDigits:2})
      data[i].employerContribution=Number(data[i].employerContribution).toLocaleString('en-US',{minimumFractionDigits:2})
      data[i].total=Number(data[i].total).toLocaleString('en-US',{minimumFractionDigits:2})
    }
    this.dataSource=new MatTableDataSource(data)
  }
  }))
}
}
