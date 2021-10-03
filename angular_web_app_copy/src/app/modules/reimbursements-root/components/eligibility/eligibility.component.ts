import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core'
import { MatDialogRef } from '@angular/material/dialog';
import { ReimbursementsService } from '../../../reimbursements-root/services/reimbursements.service';
@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EligibilityComponent implements OnInit {
  dataEligibility: any =[];
  color: ThemePalette = 'primary';
  dataList: Array<any> = []

  constructor(public dialogRef: MatDialogRef<any>,
    private Reimbursementservice: ReimbursementsService,
  ) { }

  ngOnInit(): void {
    this.populateData()

  }
  onNoClick(): void {
    this.dialogRef.close()
  }

  populateData() {

    let workflow = this.Reimbursementservice
      .getEligibility()
      .subscribe((data) => {

        for ( let item of data ){

          if (item.reimbursementText != 'Select All'){

            this.dataEligibility.push(item)
          }
        }
        // this.dataEligibility = data;

        this.dataEligibility.forEach(element => {
          if (element.totalAmount != 0) {


            element.percentage = Math.round(element.amount * 100 / element.totalAmount)
            element.utilizePercent = element.percentage
            //element.percentage = + '%'
            element.pendingPercent = 100 - element.utilizePercent

          } else{

            element.percentage = 0;
            element.utilizePercent = 0;
            element.pendingPercent = 0;
          }
        });

      });

  }
}





