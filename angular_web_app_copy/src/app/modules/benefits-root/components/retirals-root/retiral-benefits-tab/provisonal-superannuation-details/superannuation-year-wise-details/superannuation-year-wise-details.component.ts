import { Component, OnInit, ViewEncapsulation, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuperannuationMonthWiseDetailsComponent } from '../superannuation-month-wise-details/superannuation-month-wise-details.component';
import { Subscription } from 'rxjs';
import { RetiralsService } from '../../retirals.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-superannuation-year-wise-details',
  templateUrl: './superannuation-year-wise-details.component.html',
  styleUrls: ['./superannuation-year-wise-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuperannuationYearWiseDetailsComponent implements OnInit ,OnDestroy{
  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['year','total'];
  dataSource =new MatTableDataSource([])

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SuperannuationYearWiseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private retiralService:RetiralsService
  ) { }

  ngOnInit(): void {
    this.getSuperannuationYearSummary()
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
    this.dialog.open(SuperannuationMonthWiseDetailsComponent, {
      width: '800px',
      data:element
    });
  }
  getSuperannuationYearSummary(){
    this.subscriptionsList.push(this.retiralService.getSuperannuationYearSummary(this.data).subscribe((data:any)=>{
      console.log(data)
      if(data.length>0){
      for(let i=0;i<data.length;i++){
       
        data[i].total=Number(data[i].total).toLocaleString('en-US',{minimumFractionDigits:2})
       
      }
      this.dataSource=new MatTableDataSource(data)
    }
    }))
  }
}
