import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-important-date-edit',
  templateUrl: './important-date-edit.component.html',
  styleUrls: ['./important-date-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImportantDateEditComponent implements OnInit {

  breadcrumbJson: any = [
    {
      label: 'Personal Details',
      link: '/personal-details',
    },
    {
      label: 'Important Dates',
      link: '/personal-details/important-dates',
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
