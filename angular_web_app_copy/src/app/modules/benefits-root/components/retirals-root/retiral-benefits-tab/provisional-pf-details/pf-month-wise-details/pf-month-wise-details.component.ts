import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RetiralsService } from '../../retirals.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pf-month-wise-details',
  templateUrl: './pf-month-wise-details.component.html',
  styleUrls: ['./pf-month-wise-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PfMonthWiseDetailsComponent implements OnInit {
  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['month','employee','employer','vpf','total'];
  dataSource = new MatTableDataSource([])

  displayedColumns2: any = ['description','employee','employer','total'];
  dataSource2 = new MatTableDataSource([])

  constructor(
    public dialogRef: MatDialogRef<PfMonthWiseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private retiralService:RetiralsService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.getMonthSummary()
    this.getProvidentBalance()
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
  getMonthSummary(){
    this.subscriptionsList.push(this.retiralService.getProvidentMonthSummary(this.data).subscribe((data:any)=>{
      console.log(data)
      if(data.length>0){
      for(let i=0;i<data.length;i++){
        data[i].employeeContribution=Number(data[i].employeeContribution).toLocaleString('en-US',{minimumFractionDigits:2})
        data[i].employerContribution=Number(data[i].employerContribution).toLocaleString('en-US',{minimumFractionDigits:2})
        data[i].total=Number(data[i].total).toLocaleString('en-US',{minimumFractionDigits:2})
        data[i].vpf=Number(data[i].vpf).toLocaleString('en-US',{minimumFractionDigits:2})
      }
      this.dataSource=new MatTableDataSource(data)
    }
    }))
  }
  getProvidentBalance(){
    this.subscriptionsList.push(this.retiralService.getProvidentBalance(this.data).subscribe((data:any)=>{
      console.log(data)
      if(data.length>0){
      for(let i=0;i<data.length;i++){
        data[i].employeeShare=Number(data[i].employeeShare).toLocaleString('en-US',{minimumFractionDigits:2})
        data[i].employerShare=Number(data[i].employerShare).toLocaleString('en-US',{minimumFractionDigits:2})
        data[i].totalBalance=Number(data[i].totalBalance).toLocaleString('en-US',{minimumFractionDigits:2})
      }
      this.dataSource2=new MatTableDataSource(data)
    }
    }))
  }

}
