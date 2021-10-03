import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import {
  MultiDataSet,
  Label,
  Color,
  PluginServiceGlobalRegistrationAndOptions,
} from 'ng2-charts';

@Component({
  selector: 'donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css'],
})
export class DonutChartComponent {
  constructor() {}

  ngOnInit(): void {}
  public doughnutChartData: MultiDataSet = [[20, 50]];
  public doughnutChartLabels: string[] = ['Pending', 'Completed'];
  public doughnutChartType: ChartType = 'doughnut';
  public colors: any = [{ backgroundColor: ['#FA3A3A', '#56B8F5'] }];
  public doughnutChartOptions1: any = {
    legend: {
      display: false,
    },
    // showTooltips: false,
    cutoutPercentage: 50,
  };
}
