import { Component, OnInit } from '@angular/core';
import { RewardsAndRecognitionService } from '../../rewards-and-recognition.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../../../components/core/config/config';

@Component({
  selector: 'app-top-offers',
  templateUrl: './top-offers.component.html',
  styleUrls: ['./top-offers.component.css'],
})
export class TopOffersComponent implements OnInit {
  allBanner: any;
  bannerURL: any;
  configHeader = 'https://pre-sharearide.ril.com';

  bannerImageUrl: any = '';
  bannerOnlyImage: [];
  errorMsg: string;
  constructor(
    private rewardsViewService: RewardsAndRecognitionService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getBannerInfo();
  }

  getBannerInfo() {
    this.rewardsViewService.getBannerData().subscribe((data: any) => {
      if (data == null) {
        this.allBanner = '';
      } else {
        this.allBanner = data;
        data.forEach((value, index) => {
          if (value.bannerType != 'SAP') {
            this.bannerURL = this.configHeader + value.bannerImgUrl;
            this.allBanner[index].bannerImgUrl = this.bannerURL;
          }
        });
      }
    });
  }

  bannerImage(docId) {
    this.bannerImageUrl = '';
    this.rewardsViewService.getImage(docId).subscribe((resdata: any) => {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.bannerImageUrl = this._sanitizer.bypassSecurityTrustUrl(
          event.target.result
        );
      };
      let file = new Blob([resdata]);
      reader.readAsDataURL(file);
    });
  }
}
