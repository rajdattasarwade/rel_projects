import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VpfCreateDeductionModalComponent } from './vpf-create-deduction-modal/vpf-create-deduction-modal.component';
import {VpfService} from './vpf.service'
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-vpf-tab',
  templateUrl: './vpf-tab.component.html',
  styleUrls: ['./vpf-tab.component.css']
})
export class VpfTabComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['fromdate', 'todate', 'deduction'];
  dataSource = new MatTableDataSource([]);
  public subscriptionsList: Subscription[] = [];
  public note=''
  
  constructor(public dialogRef: MatDialogRef<VpfCreateDeductionModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public activeModal: MatDialog,private vpfService:VpfService) { }

  ngOnInit(): void {
    this.getOverview()
  }
  getOverview(){
    this.subscriptionsList.push(this.vpfService.getVPFOverview().subscribe((data:Array<any>)=>{
      console.log(data)
      if(data.length>0){
      for(let i=0;i<data.length;i++){
        data[i].fromDate=moment(data[i].fromDate).format('DD-MM-YYYY')
        data[i].toDate=moment(data[i].toDate).format('DD-MM-YYYY')
      }
      this.dataSource=new MatTableDataSource<any>(data)
      this.note=data[0].note
    }
    })
    )
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }
  createDeduction() {
    const dialogRef = this.activeModal.open(VpfCreateDeductionModalComponent, {
      width: '683px',
    });
     dialogRef.afterClosed().subscribe(resp=>{
       this.getOverview()
     })
    
  }

 
}
