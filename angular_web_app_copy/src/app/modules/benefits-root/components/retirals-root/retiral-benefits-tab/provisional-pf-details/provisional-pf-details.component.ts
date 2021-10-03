import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PfYearWiseDetailsComponent } from './pf-year-wise-details/pf-year-wise-details.component';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { RetiralsService } from '../retirals.service';

@Component({
  selector: 'app-provisional-pf-details',
  templateUrl: './provisional-pf-details.component.html',
  styleUrls: ['./provisional-pf-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProvisionalPfDetailsComponent implements OnInit,OnDestroy {
  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['sr_no','managed_by','employee','employer','total'];
  dataSource =new MatTableDataSource([])

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProvisionalPfDetailsComponent>,
    private retiralService:RetiralsService
  ) { }

  ngOnInit(): void {
    this.getProvidentSummary()
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
    this.dialog.open(PfYearWiseDetailsComponent, {
      width: '800px',
      data:element
    });
  }
  getProvidentSummary(){
    this.subscriptionsList.push(this.retiralService.getProvidentSummary().subscribe((data:any)=>{
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
