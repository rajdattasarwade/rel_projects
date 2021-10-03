import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-basic-information-edit',
  templateUrl: './basic-information-edit.component.html',
  styleUrls: ['./basic-information-edit.component.css','../../../../personal-details-root.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BasicInformationEditComponent implements OnInit {

  breadcrumbJson: any = [
    {
      label: 'Personal Details',
      link: '/personal-details'
    },
    {
      label: 'Basic Information',
      link: '/personal-details/basic-information'
    }
  ];
  labelFlex = 30;
  inputFlex = 60;
  constructor() { }

  ngOnInit(): void {
  }

}
