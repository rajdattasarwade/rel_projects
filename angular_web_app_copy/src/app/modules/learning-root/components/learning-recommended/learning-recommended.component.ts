import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { LearningService } from '../../learning.service';

@Component({
  selector: 'app-learning-recommended',
  templateUrl: './learning-recommended.component.html',
  styleUrls: ['./learning-recommended.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LearningRecommendedComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  recommendedCoursesList: any;
  constructor(private service: LearningService) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    if (
      this.service.recommendedList &&
      this.service.recommendedList.length > 0
    ) {
      this.recommendedCoursesList = this.service.recommendedList.slice(0, 5);
    } else {
      this.getLeaningRecommendations();
    }
  }
  getLeaningRecommendations() {
    var subscription = this.service.getLeaningSystemRecommendation().subscribe(
      (data) => {
        console.log('learning ==> RECOMMENDATION=> data =>', data);
        this.service.recommendedList = data['data'];
        if (
          this.service.recommendedList &&
          this.service.recommendedList.length > 0
        ) {
          this.recommendedCoursesList = this.service.recommendedList.slice(
            0,
            5
          );
          console.log(
            'learning ==> RECOMMENDATION=> recommendedCoursesList=>',
            this.recommendedCoursesList
          );
        } else {
          this.recommendedCoursesList = [];
          console.log(
            'learning ==> RECOMMENDATION=> this.service.recommendedList is undefined'
          );
        }
      },
      (error) => {
        if (
          this.service.recommendedList &&
          this.service.recommendedList.length > 0
        ) {
          this.recommendedCoursesList = this.service.recommendedList.slice(
            0,
            5
          );
          console.log(
            'erro=learning ==> RECOMMENDATION=> recommendedCoursesList=>',
            this.recommendedCoursesList
          );
        } else {
          this.recommendedCoursesList = [];
          console.log(
            'erro=learning ==> RECOMMENDATION=> this.service.recommendedList is undefined'
          );
        }
        console.error('erro=learning ==> RECOMMENDATION=> jqama...', error);
      },
      () => {
        console.log('final=learning ==> RECOMMENDATION=> final...');
      }
    );
    this.subscription.add(subscription);
  }
  openCourse(course) {
    console.log('learning ==> RECOMMENDATION=> openCourse...', course.title);
    this.service.goToExternalUrl(course.courseUrl);
  }
  getImage(index) {
    return index % 2 == 0
      ? this.service.getLinkedinImage
      : this.service.getCourseraImage;
  }
  viewAll() {
    this.service.learningNavigateTo(['/learning/viewAllRecommended']);
  }
}
