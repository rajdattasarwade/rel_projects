import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { UserService } from './user.service';
//   import { LoaderService } from "../../../spinner/spinner.service";
//   import { UserService } from "../../../common/core/services/httpModule.service";
//   import { LoggingService } from "../components/errorHandler/logging.service";
//   import { AppService } from "./app.service";

@Injectable()
export class LoginService implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService //   private loaderService: LoaderService, //   private userService: UserService, //   private loggingService: LoggingService,
  ) //   private appService: AppService
  {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Change here to add AuthService and to check if user is currently logged in
    if (Config.landingUrl === '') {
      Config.landingUrl = state.url;
      console.log(Config.landingUrl);
    }
    console.log('test login service');
    if (!navigator.onLine) {
      // this.loggingService.setCustomError(
      //   "It looks like you're not connected to the internet. Check your network connection and try again"
      // );
      return false;
    } else {
      console.log('loaderCall Init: called from route change');
      // this.loaderService.initLoader();
      if (Config.loggedIn) {
        this.userService.getAllHoliday(new Date().getFullYear()).subscribe(
          (data: any) => {},
          (err) => {}
        );
      }
      if (Config.userId === '') {
        console.log('yoooooooooo');
        this.router.navigate(['login']);
      }
      // this.appService.setPageVisit(state.url);
      return true;
    }
  }
}
