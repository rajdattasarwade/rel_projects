import { Injectable } from "@angular/core";
// import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class LoadingSpinnerService {
  public loaderCount = 0;
  public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}

  initLoader() {
    this.loaderCount = 0;
    this.displayLoaderOnCount();
  }

  displayLoaderOnCount() {
    if (this.loaderCount < 1) {
      this.loaderStatus.next(false);
    } else {
      this.loaderStatus.next(true);
    }
  }

  showLoaderOnCount() {
    this.loaderCount = this.loaderCount + 1;
    this.displayLoaderOnCount();
  }

  hideLoaderOnCount() {
    if (this.loaderCount > 0) {
      this.loaderCount = this.loaderCount - 1;
    }
    this.displayLoaderOnCount();
  }
}
