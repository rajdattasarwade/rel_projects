import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { BenefitsService } from '../../../services/benefits.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-retirals-benefit-widget',
  templateUrl: './retirals-benefit-widget.component.html',
  styleUrls: ['./retirals-benefit-widget.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RetiralsBenefitWidgetComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  pfAmt: any;
  gratuityAmt: any;
  superannuationAmt: any;
  retiralDet: any;
  nps: any;
  vpf: any;
  superannuation: any;
  deductionDetail: any;
  public doughnutChartData: MultiDataSet = [[0, 100]];
  public doughnutChartLabels: string[] = ['Pending', 'Completed'];
  public doughnutChartType: ChartType = 'doughnut';
  public colors: any = [{ backgroundColor: ['#ED544E', '#60A058'] }];
  public doughnutChartOptions1: any = {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
    cutoutPercentage: 50,
  };
  currentDate: any;

  constructor(public benefitService: BenefitsService) {}

  ngOnInit(): void {
    this.currentDate = format(new Date(), 'dd MMM yyyy');
    this.getRetiralInfo();
    this.getRetiralDeductions();
  }

  getRetiralInfo() {
    this.pfAmt = 0;
    this.gratuityAmt = 0;
    this.superannuationAmt = 0;
    this.subscriptionsList.push(
      this.benefitService.getRetiralInfo().subscribe(
        (data) => {
          if (data) {
            console.log('Retirals');
            console.log(data);
            this.retiralDet = data;
            this.retiralDet.forEach((retiral) => {
              if (retiral.description == 'Provisional Provident Fund Balance') {
                this.pfAmt = retiral.amount;
              } else if (
                retiral.description == 'Provisional Gratuity/Ex-Gratia'
              ) {
                this.gratuityAmt = retiral.amount;
              } else if (
                retiral.description == 'Provisional Superannuation Fund Balance'
              ) {
                this.superannuationAmt = retiral.amount;
              } else {
              }
            });
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }

  getRetiralDeductions() {
    var year = format(new Date(), 'dd MM yyyy').split(' ')[2];
    var month = format(new Date(), 'dd MM yyyy').split(' ')[1];
    console.log(year);
    console.log(month);
    // var data = {
    //   user: '',
    //   year: '',
    //   month: '',
    //   basic: 82756.36,
    //   nps: 6600.0,
    //   vpf: 827.56,
    //   superannuation: 0.0,
    // };
    // if (data) {
    //   this.deductionDetail = data;
    //   console.log('Retirals');
    //   console.log(data);
    //   this.nps = this.deductionDetail.nps;
    //   this.vpf = this.deductionDetail.vpf;
    //   this.superannuation = this.deductionDetail.superannuation;
    // }

    this.subscriptionsList.push(
      this.benefitService.getRetiralDeduction(year, month).subscribe(
        (data) => {
          if (data) {
            this.deductionDetail = data;
            this.nps = this.deductionDetail.nps;
            this.vpf = this.deductionDetail.vpf;
            this.superannuation = this.deductionDetail.superannuation;
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }

  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
