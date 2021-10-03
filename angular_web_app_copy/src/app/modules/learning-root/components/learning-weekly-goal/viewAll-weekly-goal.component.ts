import { Component, OnInit } from '@angular/core';
import { MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { LearningService } from '../../learning.service';

@Component({
  selector: 'app-viewAll-weekly-goal',
  templateUrl: './viewAll-weekly-goal.component.html',
})
export class ViewAllWeeklyGoalComponent implements OnInit {
  constructor(private service: LearningService) {}

  ngOnInit(): void {}
  public doughnutChartData: MultiDataSet = [[100000, 30000]];
  public doughnutChartLabels: string[] = ['Completed', 'Pending'];
  public doughnutChartType: ChartType = 'doughnut';
  public colors: any = [{ backgroundColor: ['#56B8F5', '#F43B52'] }];
  public doughnutChartOptions1: any = {
    legend: {
      display: false,
    },
    // showTooltips: false,
    cutoutPercentage: 50,
  };

  goBack() {
    this.service.goBackToHome();
  }
}
