import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { LearningService } from '../../learning.service';
@Component({
  selector: 'app-viewAll-recommended',
  templateUrl: './viewAll-recommended.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ViewAllRecommendedComponent implements OnInit, OnDestroy {
  recommendedCoursesList: any;
  constructor(private service: LearningService) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.service.goToTop();
    this.init();
  }
  init() {
    if (
      this.service.recommendedList &&
      this.service.recommendedList.length > 0
    ) {
      this.recommendedCoursesList = this.service.recommendedList;
    } else {
      this.recommendedCoursesList = [];
    }
  }
  goBack() {
    this.service.goBackToHome();
  }

  openCourse(course) {
    console.log('learning ==> RECOMMENDATION=> openCourse...', course.title);
    this.service.goToExternalUrl(course.courseUrl);
  }
}
