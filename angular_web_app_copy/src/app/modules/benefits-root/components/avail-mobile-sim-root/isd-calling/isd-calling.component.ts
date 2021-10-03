import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IsdIrModel } from '../avail-mobile-sim.model';
import { AvailMobileSimService } from '../avail-mobile-sim.service';
import { IsdActivationModalComponent } from './isd-activation-modal/isd-activation-modal.component';

@Component({
  selector: 'app-isd-calling',
  templateUrl: './isd-calling.component.html',
  styleUrls: ['./isd-calling.component.css']
})
export class IsdCallingComponent implements OnInit, OnDestroy {
  displayedColumns: any = ['requestnumber', 'type', 'validity', 'status'];
  dataSource: any;
  isdEnable: boolean;
  subscriptionList: Subscription[] = [];
  constructor(public activeModal: MatDialog, public dialogRef: MatDialogRef<IsdActivationModalComponent>, private availMobileSimService: AvailMobileSimService) {
    this.dataSource = new MatTableDataSource<IsdIrModel>([]);
   }
  breadcrumbJson: any = [ 
    {
      label: 'Avail SIM Card',
      link: '/benefits/avail-mobile-sim'
    },
    {
      label: 'ISD Calling',
      link: '/benefits/isd-calling'
    }
  ];
  ngOnInit(): void {
    this.getIsdData();
    this.getValidity();
  }
  openISDActivation() {
    const dialogRef = this.activeModal.open(IsdActivationModalComponent, {
      width: '452px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if(value){
        this.getIsdData();
        this.getValidity();
      }
    })
 }
 getIsdData(): void {
 this.subscriptionList.push(
  this.availMobileSimService.getIsdAndIrData('6').subscribe((data: IsdIrModel[]) => {
    if(data.length > 0){
      this.dataSource = new MatTableDataSource<IsdIrModel>(data);
    }
   })
 );
}
 getDateFormat(date: string): string {
  return date.split('/').join('.');
  }
  getValidity(): void {
    this.subscriptionList.push(
      this.availMobileSimService.getIsdValidity().subscribe((data: any) => {
        if(data){
          this.isdEnable = data.exFlag === 'X' ? true: false;
        }
      })
    );
  }
  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0){
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      });
    }
  }
}
