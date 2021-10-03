import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-people-card-rectangular',
  templateUrl: './people-card-rectangular.component.html',
  styleUrls: ['./people-card-rectangular.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PeopleCardRectangularComponent implements OnInit {
  @Input() photoUrl: string;
  @Input() employeeName: string;
  @Input() employeeId: number;
  @Input() employeeDesgn: string;
  @Input() employeeReporteeLength: number;
  @Input() employeeEmail: string;
  @Input() employeeMobile: string;
  @Input() class: any;
  @Input() employeeProgressValue : number;
  @Input() employeeProgressBar : boolean;
  constructor() { }

  ngOnInit(): void {
    this.photoUrl = this.photoUrl != undefined ? this.photoUrl : '';
    this.employeeProgressBar = this.employeeProgressBar != undefined ? this.employeeProgressBar : false;
  }

}
