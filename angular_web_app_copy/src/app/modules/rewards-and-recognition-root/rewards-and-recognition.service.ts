import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../components/core/config/config';

@Injectable()
export class RewardsAndRecognitionService {
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };

  getRequestHeaders() {
    return new HttpHeaders({
      userId: Config.userId,
      'Content-Type': 'application/json',
    });
  }
  private baseRecogniseUrl: String =
    Config.baseUrl + `recognize-my-colleague-service/${Config.apiVersion}/`;
  private baseRewardUrl: String =
    Config.baseUrl + `reward-my-colleague-service/${Config.apiVersion}/`;
  private baseHeaderUrl: String =
    Config.baseUrl + 'rilnews-and-spotlight-service/' + Config.apiVersion + '/';
  private recoGivenUrl: string = this.baseRecogniseUrl + 'given';
  private recoReceiveUrl: string = this.baseRecogniseUrl + 'received';
  private rewardMyRewardsUrl: string = this.baseRewardUrl + 'received';
  private rewardMyRecipientsUrl: string = this.baseRewardUrl + 'given';
  private topTenUrl: string = this.baseRecogniseUrl + 'wall';
  private bannerUrl: string = this.baseHeaderUrl + 'spotlight/banner';
  private showComImage: string = this.baseHeaderUrl + 'news/image';
  constructor(private http: HttpClient) {}

  getwallData() {
    return this.http.get(this.topTenUrl, this.reqOptions);
  }

  getBannerData() {
    return this.http.get(
      this.bannerUrl + '?bannerFrameId=F001',
      this.reqOptions
    );
  }

  getrecognizeGivenData() {
    return this.http.get(this.recoGivenUrl, this.reqOptions);
  }
  getrecognizeReceivedData() {
    return this.http.get(this.recoReceiveUrl, this.reqOptions);
  }

  getrewardGivenData() {
    return this.http.get(this.rewardMyRecipientsUrl, this.reqOptions);
  }
  getrewardReceivedData() {
    return this.http.get(this.rewardMyRewardsUrl, this.reqOptions);
  }
  getImage(docId) {
    const httpHeader = this.getRequestHeaders();
    let url = this.showComImage + '?docId=' + docId;
    return this.http.get(url, {
      headers: httpHeader,
      responseType: 'blob' as 'json',
    });
  }
}
