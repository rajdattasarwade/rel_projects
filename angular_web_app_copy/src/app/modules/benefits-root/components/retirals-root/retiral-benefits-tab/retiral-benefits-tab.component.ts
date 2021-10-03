import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RetiralBenefitsPdfViewerComponent } from './retiral-benefits-pdf-viewer/retiral-benefits-pdf-viewer.component';
import { RetiralsService } from './retirals.service'
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ProvisionalPfDetailsComponent } from './provisional-pf-details/provisional-pf-details.component';
import { ProvisonalSuperannuationDetailsComponent } from './provisonal-superannuation-details/provisonal-superannuation-details.component';
import { ProvisionalGratuityDetailsComponent } from './provisional-gratuity-details/provisional-gratuity-details.component';

@Component({
  selector: 'app-retiral-benefits-tab',
  templateUrl: './retiral-benefits-tab.component.html',
  styleUrls: ['./retiral-benefits-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RetiralBenefitsTabComponent implements OnInit ,OnDestroy{

  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['description','total','action'];
  dataSource =new MatTableDataSource([])

  constructor(
    public dialog: MatDialog,public retiralsService:RetiralsService
  ) { }

  ngOnInit(): void {
    this.getSummary()
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }
  openPdfViewer(element) {
    this.dialog.open(RetiralBenefitsPdfViewerComponent, {
      width: '683px',
      data:element
    })
  }
getSummary(){
  this.subscriptionsList.push(this.retiralsService.getSummary().subscribe((data:any)=>{
    console.log(data)
    if(data.length!=0){
    for(let i=0;i<data.length;i++){
      data[i].amount=Number(data[i].amount).toLocaleString('en-US',{minimumFractionDigits:2})
    }
    this.dataSource=new MatTableDataSource(data)
  }
  }))
}

  openDetailsPopup(type) {
    if (type == 'Provisional Provident Fund Balance') {
      this.dialog.open(ProvisionalPfDetailsComponent, {
        width: '800px'
      });
    } else if (type == 'Provisional Superannuation Fund Balance') {
      this.dialog.open(ProvisonalSuperannuationDetailsComponent, {
        width: '800px'
      });
    } else if (type == 'Provisional Gratuity/Ex-Gratia') {
      this.dialog.open(ProvisionalGratuityDetailsComponent, {
        width: '800px'
      });
    }
  }
}
