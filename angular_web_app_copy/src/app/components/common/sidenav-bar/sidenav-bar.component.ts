import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.css'],
})
export class SidenavBarComponent implements OnInit {
  isExpanded = false;
  menuList: any;
  constructor(private service: CommonService, private router: Router) {}

  ngOnInit(): void {
    this.menuList = this.service.getMenuList;
  }

  gotoMenuLink(url): void {
    this.router.navigate([url]);
  }
}
