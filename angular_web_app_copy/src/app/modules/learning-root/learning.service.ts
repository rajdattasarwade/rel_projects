import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from 'src/app/components/core/config/config';
import { Router } from '@angular/router';
@Injectable()
export class LearningService {
  public inProgressList: any = [];
  public recommendedList: any = [];
  /**
   * APIs
   */
  private lmsCompletionUrl: string =
    Config.baseUrl +
    `lms-completion-service/${Config.apiVersion}/mycourse/status`;
  private lmsRecommendationUrl: string =
    Config.baseUrl +
    `learning-recommendations-service/${Config.apiVersion}/recommend/system`;
  courseraImage: string = 'assets/images/learning/courseraLogoBlueWhite.png';
  linkedinImage: string = 'assets/images/learning/linkedIdBlueWhite.png';
  runiversityImage: string = 'assets/images/learning/RUniversity.png';
  youtubeImage: string = 'assets/images/learning/learning.png';
  /**
   *
   * getters
   */

  get getCourseraImage() {
    return this.courseraImage;
  }

  get getLinkedinImage() {
    return this.linkedinImage;
  }

  get getRuniversityImage() {
    return this.runiversityImage;
  }
  get getYoutubeImage() {
    return this.youtubeImage;
  }
  /**
   *
   * getters ends
   */
  constructor(private httpClient: HttpClient, private router: Router) {}
  public requestHeaderForLMS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId.slice(1),
    }),
  };
  getLeaningInprogress() {
    let action = 'in_progress';
    // return this.httpClient.get('assets/files/learningInProgress.json');
    return this.httpClient.get(
      this.lmsCompletionUrl + '?action=' + action,
      this.requestHeaderForLMS
    );
  }
  getLeaningSystemRecommendation() {
    // return this.httpClient.get(
    //   'assets/files/learningSystemRecommendations.json'
    // );
    return this.httpClient.get(
      this.lmsRecommendationUrl,
      this.requestHeaderForLMS
    );
  }
  goToExternalUrl(url) {
    window.open(url);
  }
  learningNavigateTo(path) {
    this.router.navigate(path);
  }
  goBackToHome() {
    this.router.navigate(['/learning']);
  }
  goToTop() {
    document.querySelector('#matDrawerContent').scrollTop = 0;
  }
}
