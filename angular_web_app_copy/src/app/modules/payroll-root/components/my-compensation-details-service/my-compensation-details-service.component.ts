import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-compensation-details-service',
  templateUrl: './my-compensation-details-service.component.html',
  styleUrls: ['./my-compensation-details-service.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class MyCompensationDetailsServiceComponent implements OnInit {

  breadcrumbJson: any = [
    {
      label: 'Payroll',
      link: '/payroll'
    },
    {
      label: 'My Compensation Details',
      link: '/payroll/my-compensation-details'
    }
  ]; 

  constructor() {}




  


 

  ngOnInit(): void {}
}
