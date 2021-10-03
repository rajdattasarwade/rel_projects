import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-card-list',
  templateUrl: './people-card-list.component.html',
  styleUrls: ['./people-card-list.component.css'],
})
export class PeopleCardListComponent implements OnInit {
  @Input() employeeName: any;
  @Input() employeePosition: any;
  @Input() picUrl: any;
  @Input() selectedClass: any;
  constructor() {}

  ngOnInit(): void {
    this.picUrl = this.picUrl != undefined ? this.picUrl : '';
    // this.employeePosition =
    //   this.employeePosition != undefined ? this.employeePosition : '--';
    this.employeeName =
      this.employeeName != undefined ? this.employeeName : '--';
  }
}
