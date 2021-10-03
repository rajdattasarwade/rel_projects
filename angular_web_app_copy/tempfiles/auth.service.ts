// import { InitAppDataService } from "./init_app_data.service";
// import { LoaderService } from "./../../../spinner/spinner.service";
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
// import { userProfileData } from "./../../../components/modules/user/user_profile/user_profile.interface";
import { HttpHeaders } from '@angular/common/http';
import { Config } from './../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import '../../../../assets/js/main.js';
// import { ClevertapService } from "./clevertap.service";
// import { AppService } from "./app.service";
// import {
//   HYDConfig,
//   RETAILConfig,
//   JIOConfig,
//   JSMSLConfig,
//   NWConfig,
// } from "../config/BU_configuration";

// declare var jsCallbacks: any;
@Injectable()
export class AuthService {
  private apimTokenGetUrl: string =
    Config.baseUrl + `auth-service/${Config.apiVersion}/token/decrypt`;
  private testUrl = 'assets/decrypt.json';
  private isManagerUrl: string =
    Config.baseUrl + `user-info-service/${Config.apiVersion}/isManager`;
  private userProfileGetUrl: string =
    Config.baseUrl + `user-info-service/${Config.apiVersion}/newUser/profile`;
  // Config.baseUrl + `user-info-service/${Config.apiVersion}/profile`;
  private testprofileUrl = 'assets/userprofile.json';
  private buidentifierUrl: string =
    Config.baseUrl + `user-info-service/${Config.apiVersion}/buidentifier`;
  private detailsMapUrl: string =
    Config.baseUrl + `app-service/${Config.apiVersion}/detailsMap`;
  public loggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  //method to choose BUConfiguration class acc to bUnit.
  //   loadBUConfigurationClass() {
  //     if (Config.bUnit == "HYD") {
  //       return HYDConfig;
  //     } else if (Config.bUnit == "RETAIL") {
  //       return RETAILConfig;
  //     } else if (Config.bUnit == "JIO") {
  //       return JIOConfig;
  //     } else if (Config.bUnit == "JSMSL") {
  //       return JSMSLConfig;
  //     } else if (Config.bUnit == "NW") {
  //       return NWConfig;
  //     } else {
  //       return HYDConfig;
  //     }
  //   }

  fetchApimToken(): Promise<any> {
    return this.http
      .get(this.apimTokenGetUrl)
      .map((res: any) => res)
      .toPromise();
  }

  isUserManager(): Promise<boolean> {
    let reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
    return this.http
      .get(this.isManagerUrl, reqOptions)
      .map((res: any) => res)
      .toPromise();
  }

  //   getUserProfile(): Promise<userProfileData> {
  //     console.log("getUserProfile() 02");
  //     return this.http
  //       .get(this.userProfileGetUrl)
  //       .map((res: any) => res)
  //       .toPromise();
  //   }

  getUserProfile() {
    console.log('getUserProfile() 02');
    return this.http
      .get(this.userProfileGetUrl)
      .map((res: any) => res)
      .toPromise();
  }

  getBUIdentifier(): Promise<any> {
    let reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
    return this.http.get(this.buidentifierUrl, reqOptions).toPromise();
  }
  getCategoryServices(): Promise<any> {
    let reqOptions = {
      headers: new HttpHeaders({
        userId: Config.userId,
        buIdentifier: Config.bUnit,
      }),
    };
    return this.http.get(this.detailsMapUrl, reqOptions).toPromise();
  }
  async authenticateUser() {
    console.log('authenticateUser() 01 ');
    try {
      const response = <any>await this.fetchApimToken();

      Config.apim_header = `${response.token_type} ${response.access_token}`;

      try {
        const empProfileData = await this.getUserProfile();

        if (
          typeof empProfileData.employeeId != 'undefined' &&
          empProfileData.employeeId !== ''
        ) {
          console.log(' after getting user profile data');
          Config.userProfileData = empProfileData;
          Config.userId = `P${empProfileData.employeeId}`;
          Config.loggedIn = true;
          this.loggedIn = true;
          Config.isCordova = !!(<any>window).cordova;
          // if (Config.isCordova) {
          //   this.clevertapService.getClevertapData();
          // }
          try {
            //const bUnit = await this.getBUIdentifier();
            //Config.bUnit = bUnit.buIdentifier;
            // Config.loadBUConfiguration = this.loadBUConfigurationClass();
            try {
              //   const response = await this.getCategoryServices();
              //   if (response.errorMessage) {
              //     console.error(
              //       `could not get the Details Map, error: ${response.errorMessage}`
              //     );
              //     this.logOutUser();
              //     return;
              //   }
              try {
                const isManager = await this.isUserManager();
                // this.setCleverUserObj();
                Config.isManager = isManager;
                // let clevertapObj = Config.clevertap;
                // if (Config.isCordova) {
                // jsCallbacks.afterLoginSuccess(Config.cleverTapUserObj);
                // this.clevertapService.getClevertapData(xyz); // commented by jqama on 1stOct19
                // this.clevertapService.getpushClevertapData(clevertapObj,xyz);
                // }
                // this.clevertapService.pushClevertapLoginEvent(clevertapObj);
                // clevertap web code starts
                // if (typeof (<any>window).clevertap != 'undefined') {
                //   if (!(<any>window).cordova) {
                //     (<any>window).clevertap.onUserLogin.push({
                //       Site: Config.cleverTapUserObj,
                //     });
                //   }
                // } else {
                //   console.error('Clevertap object for web is not defined');
                // }
                // clevertap web code ends

                // let eventObj = {
                //   event_name: 'LogIn',
                //   field_name: 'Service Name',
                // };
                this.redirectUserAfterLogin();
              } catch (err) {
                console.error(`failed at isManager call, error: ${err}`);
                // TODO: add toaster warning to the user
                Config.isManager = false;
                // window.setTimeout(
                //   (self, jsCallbacks, empId) => {
                //     // jsCallbacks.afterLoginSuccess(apiManagerheader, empId);//by jqama
                //     jsCallbacks.afterLoginSuccess(Config.userProfileData);
                //   },
                //   0,
                //   this,
                //   jsCallbacks,
                //   Config.userId,
                //   Config.apim_header
                // );
                this.redirectUserAfterLogin();
              }
            } catch (err) {
              // could not get the Details Map
              console.error(`could not get the Details Map, error: ${err}`);
              // this.logOutUser();
            }
          } catch (err) {
            // could not get the BU identifer
            console.error(`could not get the BU identifer, error: ${err}`);
            this.logOutUser();
          }
        }
      } catch (err) {
        console.error(`Could not fetch the Pid, error: ${err}`);
        // could not fetch the Pid
        this.logOutUser();
      }
    } catch (err) {
      // could not get the api-manager token
      console.error(`Could not fetch the Api manager token, error: ${err}`);
      this.logOutUser();
    }
  }

  logOutUser() {
    // jsCallbacks.clearCacheAndData(function () {
    //alert('Unauthorised!! Youre being redirected to login page');
    //window.setTimeout(function () {
      //   window.location.href = Config.logoutUrl;
      //window.location.href = Config.domainUrl;
    //}, 3000);
    // });
  }

  async redirectUserAfterLogin() {
    // this.router.navigate(['home']);
    if (Config.landingUrl !== '') {
      try {
        // this.setUpAppBeforeRedirect();
        let navigationSuccess = await this.router.navigate([Config.landingUrl]);
        if (navigationSuccess) {
          // navigation was success
          // this.loaderService.hideInitLoader(0);
        } else {
          this.router.navigate(['home']);
        }
      } catch (err) {
        this.router.navigate(['home']);
      }
    } else {
      this.router.navigate(['home']);
    }
  }

  setCleverUserObj() {
    let profileData;
    Config.cleverTapUserObj = {
      Identity: '',
      Name: '',
      Location: '',
      Work_Location: '',
      Business: '',
      SegmentText: '',
      FunctionalText: '',
      'Sub-FunctionalText': '',
      OrganizationUnitID: '',
      DOB: '',
    };
    if (typeof Config.userProfileData !== 'undefined') {
      profileData = Config.userProfileData;
    }
    //jqama new block
    let identity =
      Config.userId.charAt(0).toLowerCase() == 'p'
        ? Config.userId.slice(1)
        : Config.userId;
    let empName =
      (profileData['title'] ? profileData['title'] : '') +
      (profileData['firstName'] ? profileData['firstName'] : '') +
      (profileData['lastName'] ? profileData['lastName'] : '');
    let workLoc = profileData['city'] ? profileData['city'] : '';
    let business = profileData['businessGroup']
      ? profileData['businessGroup']
      : '';
    let age = profileData['dateOfBirth'] ? profileData['dateOfBirth'] : '';
    let dob = age == '' ? '' : new Date(age);
    Config.cleverTapUserObj['Name'] = empName;
    Config.cleverTapUserObj['Work_Location'] = workLoc;
    Config.cleverTapUserObj['Identity'] = identity;
    Config.cleverTapUserObj['Business'] = business;
    Config.cleverTapUserObj['age'] = age;
    Config.cleverTapUserObj['DOB'] = dob;
    console.log(' setCleverUserObj...');
    console.log(Config.cleverTapUserObj);
  }

  // setUpAppBeforeRedirect() {
  //   this.initAppDataService.initAppDataBeforeRedirect();
  // }
}
