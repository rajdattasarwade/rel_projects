import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GratuityService } from '../gratuity.service';
import { GratuityDetailsPopupComponent } from './gratuity-details-popup/gratuity-details-popup.component';

@Component({
  selector: 'app-gratuity',
  templateUrl: './gratuity.component.html',
  styleUrls: ['./gratuity.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GratuityComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['prev_employer','inward_no','display'];
  dataSource = [];

  constructor(
    public dialog: MatDialog,
    public gratuityService: GratuityService
  ) { }

  ngOnInit(): void {
    this.getList()
  }

  openGratuityDetailsPopup(element) {
    this.dialog.open(GratuityDetailsPopupComponent, {
      width: '683px',
      data: {rowData: Object.assign({},element)}
    });
  }

  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  getList(){
    this.subscriptionsList.push(this.gratuityService.getList().subscribe(
      (data: any)=>{
        if(data.length>0){
          this.dataSource = data
        }
      }
    ))
  }


}
