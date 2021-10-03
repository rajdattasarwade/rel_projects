import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { LoadingSpinnerService } from './loading-spinner.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-loading-spinner',
  templateUrl: 'loading-spinner.html',
  styleUrls: ['loading-spinner.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoadingSpinnerComponent implements OnInit {
  public objLoaderStatus: boolean;
  public loadingText = 'Loading...';
  threshold = 500;
  timeout = 0;
  zIndex = 9999;
  intervalObject = undefined;
  startTime: number = 0;
  endTime: number = new Date().getTime();
  constructor(
    public loadingSpinnerService: LoadingSpinnerService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    let self = this;
    this.loadingText = 'Loading...';
    this.loadingSpinnerService.loaderStatus.subscribe((val: boolean) => {
      if (val) {
        this.objLoaderStatus = true;
        this.spinner.show();
        if (this.startTime == 0) {
          this.startTime = new Date().getTime();
        }
        if (typeof this.intervalObject == 'undefined') {
          this.intervalObject = window.setInterval(function () {
            self.setDisplayText();
          }, 1000);
        }
      } else {
        this.objLoaderStatus = false;
        this.spinner.hide();
        this.loadingText = '';
        this.startTime = 0;
        if (typeof this.intervalObject != 'undefined') {
          window.clearInterval(this.intervalObject);
          this.intervalObject = undefined;
        }
      }
    });
  }

  setDisplayText() {
    if (this.startTime != 0) {
      this.loadingText =
        new Date().getTime() - this.startTime > 5000
          ? 'This is taking longer than expected, please wait....'
          : 'Please wait...';
    } else {
      this.loadingText = 'Loading....';
    }
  }
}
