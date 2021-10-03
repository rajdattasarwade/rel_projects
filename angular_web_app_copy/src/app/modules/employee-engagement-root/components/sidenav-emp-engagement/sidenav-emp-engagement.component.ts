import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { EmployeeEngagementService } from '../../employee-engagement.service';
import { Config } from 'src/app/components/core/config/config';
import { UserProfile } from '../../models/user-profile.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-emp-engagement',
  templateUrl: './sidenav-emp-engagement.component.html',
  styleUrls: ['./sidenav-emp-engagement.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavEmpEngagementComponent implements OnInit {
menuList = [];
avtarUrl = Config.avtarUrl;
imageUrl: string;
profile: UserProfile;
  subscriptions: Subscription[] = [];
  constructor(private empService: EmployeeEngagementService) {}
  
  ngOnInit(): void {
    this.menuList = this.empService.menu_list;
    this.getProfile();
  }
  getProfile(): void {
    let subs = this.empService.getUserProfile().subscribe( data => {
      this.profile = data;
      if(this.profile) {
        this.imageUrl = this.avtarUrl + this.profile.employeeId +'.jpg'
      }
    },
    error => {
    console.log(error);
  });
  this.subscriptions.push(subs);
  }

  ngOnDestroy(): void {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach(subs => {
        subs.unsubscribe();
      });
    }
  }
}
