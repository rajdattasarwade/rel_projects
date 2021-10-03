import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { LearningService } from '../../learning.service';
@Component({
  selector: 'app-viewAll-in-progress',
  templateUrl: './viewAll-in-progress.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ViewAllInProgressComponent implements OnInit, OnDestroy {
  inprogessLearningList: any = [];
  constructor(private service: LearningService) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.service.goToTop();
    this.init();
  }
  init() {
    if (this.service.inProgressList && this.service.inProgressList.length > 0) {
      this.inprogessLearningList = this.service.inProgressList;
    } else {
      this.inprogessLearningList = [];
    }
  }
  goBack() {
    this.service.goBackToHome();
  }
  openCourse(course) {
    console.log('learning ==> INPROGRESS => openCourse...', course.title);
    this.service.goToExternalUrl(course.deepLink);
  }
}
