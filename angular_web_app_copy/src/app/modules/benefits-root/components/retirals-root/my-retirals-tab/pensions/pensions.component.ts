import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { PfPensionInfoPopupComponent } from '../pf-pension-info-popup/pf-pension-info-popup.component';
import { PfPensionService } from '../pf-pension.service';

@Component({
  selector: 'app-pensions',
  templateUrl: './pensions.component.html',
  styleUrls: ['./pensions.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PensionsComponent implements OnInit {

  public subscriptionsList: Subscription[]=[];
  displayedColumns: any = ['pension','prev_employer','type','current_no','prev_no','inward_no','action'];
  dataSource = [];

  constructor(
    public dialog: MatDialog,
    private pfPensionService: PfPensionService,
    private messageService:MessageModalService
  ) { }

  ngOnInit(): void {
    this.getPensionList()
  }

  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  infoPopup() {
    this.dialog.open(PfPensionInfoPopupComponent, {
      width: '450px',
      data: {
        type: 'pension'
      }
    });
  }

  getPensionList(){
    this.subscriptionsList.push(this.pfPensionService.getPensionList().subscribe(
      (data: any)=>{
        console.log(data)
        this.dataSource=data
        
      }
    ))
  }

}
