import { Injectable } from '@angular/core';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Config } from '../config/config';
import { LoadingSpinnerService } from '../../shared/loading-spinner/loading-spinner.service';
import { CustomHttpParams } from '../services/user.service';
// import { LoaderService } from '../../app/spinner/spinner.service';
// import { CustomHttpParams } from  '../common/core/services/httpModule.service';
// import '../../assets/js/main.js';

// declare var jsCallbacks: any;
@Injectable()
export class HrssInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoadingSpinnerService) {
    this.loaderService.initLoader();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('enter the interceptor!!!!');
    let skipLoader =
      (req.params instanceof CustomHttpParams && req.params.skipLoader) ||
      Config.isUserOnChatBot;
    let accessReq;
    if (Config.loggedIn) {
      // accessReq = req.clone({
      //   headers: req.headers.set("Authorization", Config.apim_header),
      // });
      // Clone the request and set the new header in one step.
      accessReq = req.clone({
        setHeaders: {
          Authorization: Config.apim_header,
          buIdentifier: Config.bUnit,
        },
      });
    } else {
      accessReq = req.clone({
        setHeaders: {
          Authorization: Config.apim_header,
          buIdentifier: Config.bUnit,
        },
      });
    }

    !skipLoader && this.loaderService.showLoaderOnCount();
    return next
      .handle(accessReq)
      .do((event) => {
        if (event instanceof HttpResponse) {
        }
      })
      .catch((err) => {
        !skipLoader && this.loaderService.hideLoaderOnCount();
        if (err.status == 403 || err.status == 401) {
          //   jsCallbacks.clearCacheAndData(function () {
          alert('Unauthorised!! Youre being redirected to login page');
          window.setTimeout(function () {
            // window.location.href = Config.logoutUrl;
          }, 3000);
          //   });
        }
        console.log('hrssinterceptor error=>',err);
        return Observable.throw(err);
      })
      .map((event) => {
        if (event instanceof HttpResponse) {
          !skipLoader && this.loaderService.hideLoaderOnCount();
        }
        return event;
      });
  }
}
