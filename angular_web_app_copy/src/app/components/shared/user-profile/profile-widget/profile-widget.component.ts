import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../user-profile.service';
import { UserService } from '../../../core/services/user.service';
import { Config } from 'src/app/components/core/config/config';

@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.css'],
})
export class ProfileWidgetComponent implements OnInit {
  profileDet: any = [];
  constructor(
    public router: Router,
    private userProfile: ProfileService,
    private userService: UserService
  ) {
    this.userService.getUserDetails().subscribe(
      (data) => {
        if (data) {
          Config.profileData = this.profileDet = this.setupUserData(data);
        }
      },
      (error) => {
        console.log();
      }
    );
  }

  ngOnInit(): void {}

  routeToMainComponent() {
    this.router.navigate(['profile']);
  }

  setupUserData(data) {
    let profile = new Profile();
    profile.empId = data['employeeId'];
    profile.designation = data['designationDesc'];
    profile.empName = data['name'];
    profile.lastSwiped = '--';
    profile.lastSwipedMode = 'Punch In';
    profile.picUrl = `https://mobcontent.ril.com/picture/${data['employeeId']}.jpg`;
    return profile;
  }
}

export class Profile {
  empName: string;
  designation: string;
  empId: string;
  lastSwiped: string;
  lastSwipedMode: string;
  picUrl: string;
}
