import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { LearningService } from '../../learning.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-learning-in-progress',
  templateUrl: './learning-in-progress.component.html',
  styleUrls: ['./learning-in-progress.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LearningInProgressComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  inprogessLearningList: any = [];
  constructor(private service: LearningService) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    if (
      this.service.inProgressList &&
      this.service.inProgressList.length > 0
    ) {
      this.inprogessLearningList = this.service.inProgressList.slice(0, 5);
    } else {
      this.getLeaningInprogress();
    }
  }
  getLeaningInprogress() {
    var subscription = this.service.getLeaningInprogress().subscribe(
      (data) => {
        console.log('learning ==> INPROGRESS => data=>', data);
        this.service.inProgressList = data['status'];
        if (
          this.service.inProgressList &&
          this.service.inProgressList.length > 0
        ) {
          this.inprogessLearningList = this.service.inProgressList.slice(0, 5);
          console.log('learning ==> INPROGRESS => inprogessLearningList=> ',this.inprogessLearningList);
        } else {
          this.inprogessLearningList = [];
          console.log('learning ==> INPROGRESS => this.service.inProgressList is undefined');
        }
      },
      (error) => {
        if (
          this.service.inProgressList &&
          this.service.inProgressList.length > 0
        ) {
          this.inprogessLearningList = this.service.inProgressList.slice(0, 5);
          console.log('error=learning ==> INPROGRESS => inprogessLearningList=> ',this.inprogessLearningList);
        } else {
          this.inprogessLearningList = [];
          console.log('error=learning ==> INPROGRESS => this.service.inProgressList is undefined');
        }
        console.error('error=learning ==> INPROGRESS =>jqama...', error);
      },
      () => {
        console.log('final=learning ==> INPROGRESS =>  final...');
      }
    );
    this.subscription.add(subscription);
  }
  openCourse(course) {
    console.log('learning ==> INPROGRESS => openCourse...', course.title);
    this.service.goToExternalUrl(course.deepLink);
  }
  getImage(index) {
    return index % 2 == 0
      ? this.service.getCourseraImage
      : this.service.getYoutubeImage;
  }
  viewAll() {
    this.service.learningNavigateTo(['/learning/viewAllProgress']);
  }
}
