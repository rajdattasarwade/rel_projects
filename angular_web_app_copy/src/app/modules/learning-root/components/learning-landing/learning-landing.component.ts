import { Component, OnInit } from '@angular/core';
import { LearningService } from '../../learning.service';

@Component({
  selector: 'app-learning-landing',
  templateUrl: './learning-landing.component.html',
  styleUrls: ['./learning-landing.component.css'],
})
export class LearningLandingComponent implements OnInit {
  inprogessLearningList: any;
  constructor(private service: LearningService) {
  }

  ngOnInit(): void {
  }
  redeem() {
    this.service.learningNavigateTo(['/learning/reedem']);
  }
}
