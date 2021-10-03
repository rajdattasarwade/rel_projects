import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GratuityEncashmentDeclarationComponent } from './gratuity-encashment-declaration/gratuity-encashment-declaration.component';
import { GratuityService } from '../gratuity.service';
import * as moment from 'moment';
import { ComingSoonComponent } from 'src/app/components/shared/common-cards/coming-soon/coming-soon.component';

@Component({
  selector: 'app-gratuity-leave-encashment',
  templateUrl: './gratuity-leave-encashment.component.html',
  styleUrls: ['./gratuity-leave-encashment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GratuityLeaveEncashmentComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['prev_employer','from_date','to_date','gratuity_amt','encashment_amt'];
  dataSource = [];


  constructor(
    public dialog: MatDialog,
    public gratuityService: GratuityService
  ) { }

  ngOnInit(): void {
    this.getDeclarationList()
    this.subscriptionsList.push(this.gratuityService.closeAllModal.subscribe((res)=>{
      if(res){
        this.getDeclarationList()
      }
    }))
  }

  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  openDeclarationPopup() {
   const dialogRef =  this.dialog.open(GratuityEncashmentDeclarationComponent, {
      width: '800px'
    });
    this.subscriptionsList.push(dialogRef.afterClosed().subscribe(
      (res)=>{
        if(res) this.getDeclarationList()
      }
    ))
  }

  getDeclarationList(){
    this.subscriptionsList.push(this.gratuityService.getDeclaration('O').subscribe(
      (data: any)=>{
        if(data.length>0){
          this.dataSource = data
          this.dataSource.forEach((element: any)=>{
            element.fromDate = element.fromDate ? moment(element.fromDate).format('DD-MM-YYYY'):null
            element.toDate = element.toDate ? moment(element.toDate).format('DD-MM-YYYY'):null
          })
        }
      }
    ))
  }

  // Temporary popup for previous employer details page
  openComingSoon(){
    const dialogRef =  this.dialog.open(ComingSoonComponent, {
      width: '800px'
    });
    dialogRef.componentInstance.text = 'Coming Soon'
  }

}
