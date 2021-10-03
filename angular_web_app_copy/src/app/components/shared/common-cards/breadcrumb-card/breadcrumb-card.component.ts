import { Component, OnInit, Input } from '@angular/core';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-breadcrumb-card',
  templateUrl: './breadcrumb-card.component.html',
  styleUrls: ['./breadcrumb-card.component.css']
})
export class BreadcrumbCardComponent implements OnInit {

  @Input() breadcrumb: any = [];

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  routeTo(link) {
    if (link) {
      this.route.navigate([link]);
    }
  }
}
