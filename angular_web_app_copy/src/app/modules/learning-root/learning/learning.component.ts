import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LearningService } from '../learning.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LearningComponent implements OnInit {
  constructor(private service: LearningService) {}

  ngOnInit(): void {
    this.service.learningNavigateTo(['/learning']);
  }
}
