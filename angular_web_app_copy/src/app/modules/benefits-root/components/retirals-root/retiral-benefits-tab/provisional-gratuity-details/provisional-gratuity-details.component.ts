import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GratuityFormulaPopupComponent } from './gratuity-formula-popup/gratuity-formula-popup.component';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { RetiralsService } from '../retirals.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-provisional-gratuity-details',
  templateUrl: './provisional-gratuity-details.component.html',
  styleUrls: ['./provisional-gratuity-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProvisionalGratuityDetailsComponent implements OnInit,OnDestroy {
  public subscriptionsList: Subscription[] = [];
  gratuitySummary: any = [{
    imMode: "",
    serialNo: "",
    managedBy: "",
    trustId: "",
    employerAmount: 0,
    employeeAmount: 0,
    total: 0,
    companyCode: "",
    trustCode: "",
    pfType: ""
  }]
  gratuityData: any = {
    exGrExemption: '',
    yearOfService: '',
    empId: '',
    basic: 0,
    derived: 0,
    gratuity: 0,
    exGratia: 0
  }
  displayedColumns: any = ['years', 'basic_pay', 'calculated_amt', 'gratuity', 'ex_gratia', 'details'];
  dataSource = new MatTableDataSource([])

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProvisionalGratuityDetailsComponent>,
    private retiralsService: RetiralsService
  ) { }

  ngOnInit(): void {
    this.getGrauitySummary()
    this.getGratuityCalc()
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
  openGratuityFormula() {
    this.dialog.open(GratuityFormulaPopupComponent, {
      width: '550px',
      data:this.gratuityData
    });
  }
  getGrauitySummary() {
    this.subscriptionsList.push(this.retiralsService.getGratuitySummary().subscribe((data: any) => {
      console.log(data)
      if(data.length>0){
      for(let i=0;i<data.length;i++){
        data[i].total=Number(data[i].total).toLocaleString('en-US',{minimumFractionDigits:2})
      }
      this.gratuitySummary = data
    }
    }))
  }
  getGratuityCalc() {
    this.subscriptionsList.push(this.retiralsService.getGratuityCalc().subscribe((data: any) => {
      console.log(data)
      
      if(Object.keys(data).length>0){
        
          data.gratuity=Number(data.gratuity).toLocaleString('en-US',{minimumFractionDigits:2})
          data.derived=Number(data.derived).toLocaleString('en-US',{minimumFractionDigits:2})
          data.basic=Number(data.basic).toLocaleString('en-US',{minimumFractionDigits:2})
          data.exGratia=Number(data.exGratia).toLocaleString('en-US',{minimumFractionDigits:2})
        
      this.gratuityData=data
      this.dataSource=new MatTableDataSource([data])
      }
    }))
  }
}
