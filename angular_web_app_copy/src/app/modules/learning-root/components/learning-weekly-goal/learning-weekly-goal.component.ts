import { Component, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { LearningService } from '../../learning.service';

@Component({
  selector: 'app-learning-weekly-goal',
  templateUrl: './learning-weekly-goal.component.html',
  styleUrls: ['./learning-weekly-goal.component.css'],
})
export class LearningWeeklyGoalComponent implements OnInit {
  constructor(private service:LearningService) {}

  ngOnInit(): void {}
  public doughnutChartData: MultiDataSet = [[20, 50]];
  public doughnutChartLabels: string[] = ['Pending','Completed'];
  public doughnutChartType: ChartType = 'doughnut';
  public colors: any = [{ backgroundColor: ['#FA3A3A','#56B8F5'] }];
  public doughnutChartOptions1: any = {
    legend: {
      display: false,
    },
    tooltips:{
      enabled: false
    },
    cutoutPercentage: 50,
  };
  viewAll() {
    this.service.learningNavigateTo(['/learning/viewAllWeeklyGoal']);
  }
}
