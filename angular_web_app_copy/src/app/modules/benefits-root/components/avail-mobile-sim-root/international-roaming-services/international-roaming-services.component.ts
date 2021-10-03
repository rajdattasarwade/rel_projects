import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IsdIrModel } from '../avail-mobile-sim.model';
import { AvailMobileSimService } from '../avail-mobile-sim.service';
import { IrRequestCreationModalComponent } from './ir-request-creation-modal/ir-request-creation-modal.component';

@Component({
  selector: 'app-international-roaming-services',
  templateUrl: './international-roaming-services.component.html',
  styleUrls: ['./international-roaming-services.component.css'],
  providers: [DatePipe]
})
export class InternationalRoamingServicesComponent implements OnInit, OnDestroy {
  displayedColumns: any = ['requestnumber', 'startdate', 'enddate', 'country', 'status'];
  dataSource: any;
  subscription: Subscription;
  constructor(public activeModal: MatDialog, private availMobileSimService: AvailMobileSimService, private datePipe: DatePipe) {
    this.dataSource = new MatTableDataSource<IsdIrModel>([]);
   }
  breadcrumbJson: any = [
    {
      label: 'Avail SIM Card',
      link: '/benefits/avail-mobile-sim'
    },
    {
      label: 'International Roaming Services',
      link: '/benefits/international-roaming-services'
    }
  ];
  ngOnInit(): void {
    this.getIrData();
  }
  openIrRequestModal() {
    const dialogRef = this.activeModal.open(IrRequestCreationModalComponent, {
      width: '944px',
    });
    dialogRef.afterClosed().subscribe(value => {
      if(value){
        this.getIrData();
      }
    })
 }

 getIrData(): void {
  this.subscription = this.availMobileSimService.getIsdAndIrData('5').subscribe((data: IsdIrModel[]) => {
    if(data.length > 0){
      this.dataSource = new MatTableDataSource<IsdIrModel>(data);
    }
   })
 }
 getDateFormat(date: string): string {
  date = date.substring(date.indexOf('(')+1, date.indexOf(')'));
  date = this.datePipe.transform(date, 'dd/MM/yyyy'); 
  return date.split('/').join('.');
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
