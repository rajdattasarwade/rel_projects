import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choice-pay',
  templateUrl: './choice-pay.component.html',
  styleUrls: ['./choice-pay.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChoicePayComponent implements OnInit {
  @Input() amount: number;
  @Input() claimed: number;
  @Input() balance: number;
  claimedByBalance: any;
  disableVehicleLog: boolean = true;
  percent = '%';

  public doughnutChartData: MultiDataSet;
  public doughnutChartLabels: string[] = ['Pending', 'Completed'];
  public doughnutChartType: ChartType = 'doughnut';
  public colors: any = [{ backgroundColor: ['#60A058', '#FA3A3A'] }];

  public doughnutChartOptions1: any = {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    data: [
      {
        type: 'doughnut',
        innerRadius: 100,
      },
    ],
    borderWidth: [10],

    cutoutPercentage: 20,
    borderColor: '#999',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges() {
    console.log(this.claimed);
    console.log(this.balance);
    this.doughnutChartData = [[this.claimed, this.balance]];
    this.claimedByBalance = this.claimed / this.balance;
    if (!Number.isFinite(this.claimedByBalance)) {
      this.claimedByBalance = 0;
    }
  }

  routeToEditChoicePay() {
    this.router.navigate(['/payroll/choicepay']);
  }
}
