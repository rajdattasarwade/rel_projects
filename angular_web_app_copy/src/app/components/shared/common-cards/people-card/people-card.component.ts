import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.css']
})
export class PeopleCardComponent implements OnInit {
  @Input() photoUrl: string;
  @Input() employeeName: string;
  @Input() employeeId: number;
  @Input() employeeDesgn: string;
  @Input() employeeReporteeLength: number;
  @Input() employeeEmail: string;
  @Input() employeeMobile: string;
  constructor() { }

  ngOnInit(): void {
  }

}