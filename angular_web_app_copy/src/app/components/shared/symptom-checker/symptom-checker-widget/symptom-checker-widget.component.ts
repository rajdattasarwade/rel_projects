import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { Config } from '../../../core/config/config';
import * as JsEncryptModule from 'jsencrypt';

@Component({
  selector: 'app-symptom-checker-widget',
  templateUrl: './symptom-checker-widget.component.html',
  styleUrls: ['./symptom-checker-widget.component.css'],
})
export class SymptomCheckerWidgetComponent implements OnInit {
  constructor(public router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  routeToMainComponent() {
    this.router.navigate(['symptom-checker']);
  }

  goToLink() {
    window.open('https://hrservices.ril.com/jiocovid-19/v4?id=', '_blank');
  }

  openCovid19page() {
    this.userService.getEncyptionKey().subscribe(
      (res) => {
        let encr_profile_id = encodeURIComponent(
          this.encryptString(Config.userProfileData['employeeId'], res)
        );
        let encr_bu_id = encodeURIComponent(
          this.encryptString(Config.bUnit, res)
        );
        let covid19URL = `https://hrservices.ril.com/jiocovid-19/?id=${encr_profile_id}&buid=${encr_bu_id}`;
        console.log('covidURL', covid19URL);
        window.open(covid19URL, '_blank');
      },
      (err) => {
        this.goToLink();
      }
    );
  }

  encryptString(string, key) {
    let encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(key);
    return encrypt.encrypt(string);
  }
}
