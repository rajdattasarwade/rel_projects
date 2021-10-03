import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-application-root',
  templateUrl: './my-application-root.component.html',
  styleUrls: ['./my-application-root.component.css']
})
export class MyApplicationRootComponent implements OnInit {

  breadcrumbJson: any = [
    {
      label: 'Gig Marketplace',
      link: '/TalentMarketplaceLandingComponent'
    },
    {
      label: 'My Applications',
      link: '/TalentMarketplaceLandingComponent/my-applications'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
