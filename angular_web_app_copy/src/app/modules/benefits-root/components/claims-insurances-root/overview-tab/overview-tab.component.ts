import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ViewEditDependentsModalComponent } from './view-edit-dependents-modal/view-edit-dependents-modal.component';
import { Subscription } from 'rxjs';
import { BenefitsService } from '../../../services/benefits.service';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewTabComponent implements OnInit {
  // color: String = '#bbb';
  // checked = false;
  // disabled = false;
  subscriptionList: Subscription[] = [];
  overviewListGHP: any;
  overviewListGPA: any;
  overviewListGTLI: any;
  constructor(private router : Router, public activeModal: MatDialog, public dialogRef: MatDialogRef<ViewEditDependentsModalComponent>, public benefitsService: BenefitsService) { }
  
  ngOnInit(): void {
    this.getCoverageOverview();
  }

  actionEvent() {
    this.router.navigate(['/benefits']);
  }

  openDependentList() {
    const dialogRef = this.activeModal.open(ViewEditDependentsModalComponent, {
      width: '60vw',
    });
  }

  getCoverageOverview(){
    let sub = this.benefitsService
      .getCoverageOverview()
      .subscribe(
        (data: any) => {
          let result = [];
          data.forEach(element => {
            element.displayName = element.planName + ' (' + element.planId  + ')';
            if(element.planId == 'GHP'){
              this.overviewListGHP = element;
            }else if(element.planId == 'GPA' ){
              this.overviewListGPA = element;
            }else if(element.planId ==  'GTLI'){
              this.overviewListGTLI = element;
            }
          });
         
        },
        (err) => {
          console.log(err);
        }
      );
      this.subscriptionList.push(sub);
    
  }

  ngOnDestroy(): void {
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
