import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IconsModel } from '../../../../components/common/common-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-id-root',
  templateUrl: './personal-id-root.component.html',
  styleUrls: ['./personal-id-root.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class PersonalIdRootComponent implements OnInit {

  icons: any[];

  constructor(private router: Router) {
    this.icons = [];
    this.icons.push(
      new IconsModel('', 'Edit', 'ico-extra-small edit-ico', 'edit')
    );
    // this.icons.push(
    //   new IconsModel('', 'Add', 'ico-extra-small add', 'add')
    // );
  }

  ngOnInit(): void {}
  aadharDetails(event) {
    if (event == 'edit') {
      this.router.navigate(['/personal-details/aadhar-card-details']);
    } else if (event == 'add'){
       
    }
  }

  panDeatils(event) {
    if (event == 'edit') {
      this.router.navigate(['/personal-details/pan-card-details']);
    }
  }

  passportDetails(event){
    this.router.navigate(['/personal-details/passport-details']);
  }

  visaDetails(event) {
    if (event == 'edit') {
      this.router.navigate(['/personal-details/visa-details']);
    }
  }
  voterIdDetails(event) {
    if (event == 'edit') {
      this.router.navigate(['/personal-details/voter-cards-details']);
    }
  }
  drivingLicense(event) {
    if (event == 'edit') {
      this.router.navigate(['/personal-details/driving-license-details']);
    }
  }

}
