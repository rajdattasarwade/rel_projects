import { Component, OnInit, ViewEncapsulation, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RetiralsService } from '../../retirals.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-superannuation-month-wise-details',
  templateUrl: './superannuation-month-wise-details.component.html',
  styleUrls: ['./superannuation-month-wise-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuperannuationMonthWiseDetailsComponent implements OnInit,OnDestroy {
  public subscriptionsList: Subscription[] = [];
  displayedColumns2: any = ['month','contribution','total'];
  dataSource2 = new MatTableDataSource([])
  displayedColumns: any = ['description','total'];
  dataSource = new MatTableDataSource([])

  constructor(
    public dialogRef: MatDialogRef<SuperannuationMonthWiseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private retiralService:RetiralsService
  ) { }

  ngOnInit(): void {
    this.getSuperannuationBalance()
    this.getSuperannuationMonthData()
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
getSuperannuationBalance(){
  this.subscriptionsList.push(this.retiralService.getSuperannuationBalance(this.data).subscribe((data:any)=>{
    console.log(data)
    if(data.length>0){
      for(let i=0;i<data.length;i++){
        data[i].totalBalance=Number(data[i].totalBalance).toLocaleString('en-US',{minimumFractionDigits:2})
      }
      this.dataSource=new MatTableDataSource(data)
    }
  }))

}
getSuperannuationMonthData(){
  console.log(this.data)
  this.subscriptionsList.push(this.retiralService.getSuperannuationMonthSummary(this.data).subscribe((data:any)=>{
    console.log(data)
    if(data.length>0){
      for(let i=0;i<data.length;i++){
        data[i].member=Number(data[i].member).toLocaleString('en-US',{minimumFractionDigits:2})
        data[i].closbalEmployee=Number(data[i].closbalEmployee).toLocaleString('en-US',{minimumFractionDigits:2})
      }
      this.dataSource2=new MatTableDataSource(data)
    }
  }))
}

}
