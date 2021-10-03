import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-card-vertical',
  templateUrl: './profile-card-vertical.component.html',
  styleUrls: ['./profile-card-vertical.component.css'],
})
export class ProfileCardVerticalComponent implements OnInit {
  @Input() fullDetails: boolean;
  @Input() shortDetails: boolean;
  @Input() profile: boolean;
  @Input() peopleData: any;
  alteredData: any;
  constructor() {}

  ngOnInit(): void {
    this.profile = this.profile != undefined ? this.profile : false;
    this.shortDetails =
      this.shortDetails != undefined ? this.shortDetails : false;
    this.fullDetails = this.fullDetails != undefined ? this.fullDetails : false;
    // this.alterData();
  }

  ngOnChanges() {
    let keys = Object.keys(this.peopleData);
    let values = Object.values(this.peopleData);
    this.alteredData = {
      empName: values[0],
      desgn: values[1],
      picUrl: values[2],
      data: [],
    };
    for (let i = 3; i < keys.length; i++) {
      let userObj = {
        key: keys[i],
        value: values[i],
      };
      this.alteredData.data.push(userObj);
    }
  }
}
