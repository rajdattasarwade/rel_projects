import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IconsModel } from '../../../../components/common/common-models';

@Component({
  selector: 'app-retirals-root',
  templateUrl: './retirals-root.component.html',
  styleUrls: ['./retirals-root.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RetiralsRootComponent implements OnInit {
public tabIndex=0
  breadcrumbJson: any = [
    {
      label: 'Benefits',
      link: '/benefits'
    },
    {
      label: 'Retirals',
      link: '/benefits/retirals'
    }
  ];
  icons: any;

  constructor(
    private router: Router
  ) {
    this.icons = [];
    this.icons.push(new IconsModel('clear', '', '', 'close'));
  }

  ngOnInit(): void {
  }

  actionEvent(event) {
    if (event == 'close') {
      this.router.navigate(['/benefits']);
    }
  }
selectedTab(event){
  console.log(event.index)
  this.tabIndex=event.index
}
}
