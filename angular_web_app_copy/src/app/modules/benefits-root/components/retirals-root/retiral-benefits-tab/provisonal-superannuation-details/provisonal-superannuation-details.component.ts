import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SuperannuationYearWiseDetailsComponent } from './superannuation-year-wise-details/superannuation-year-wise-details.component';
import { Subscription } from 'rxjs';
import { RetiralsService } from '../retirals.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-provisonal-superannuation-details',
  templateUrl: './provisonal-superannuation-details.component.html',
  styleUrls: ['./provisonal-superannuation-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProvisonalSuperannuationDetailsComponent implements OnInit,OnDestroy {
  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['sr_no','managed_by','annuity','lumpsum','total'];
  dataSource = new MatTableDataSource([])
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProvisonalSuperannuationDetailsComponent>,
    private retiralService:RetiralsService
  ) { }

  ngOnInit(): void {
    this.getSuperannuationSummary()
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

  openYearWiseDetails(element) {
    this.dialog.open(SuperannuationYearWiseDetailsComponent, {
      width: '800px',
      data:element
    });
  }
  getSuperannuationSummary(){
this.subscriptionsList.push(this.retiralService.getSuperannuationSummary().subscribe((data:any)=>{
  console.log(data)
  if(data.length>0){
    for(let i=0;i<data.length;i++){
      data[i].employeeAmount=Number(data[i].employeeAmount).toLocaleString('en-US',{minimumFractionDigits:2})
      data[i].employerAmount=Number(data[i].employerAmount).toLocaleString('en-US',{minimumFractionDigits:2})
      data[i].total=Number(data[i].total).toLocaleString('en-US',{minimumFractionDigits:2})
      
    }
    this.dataSource=new MatTableDataSource(data)
  }
}))
  }
}
