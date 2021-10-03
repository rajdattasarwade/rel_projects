import { Component, OnInit } from '@angular/core';
import { RewardsAndRecognitionService } from '../../../rewards-and-recognition.service';

@Component({
  selector: 'app-all-feed',
  templateUrl: './all-feed.component.html',
  styleUrls: ['./all-feed.component.css'],
})
export class AllFeedComponent implements OnInit {
  allRewardFeed: any;
  // url:any='assets/images/employee-award-titles.png';

  constructor(private rewardsViewService: RewardsAndRecognitionService) {}

  ngOnInit(): void {
    this.getallRewardFeed();
  }

  getallRewardFeed() {
    this.rewardsViewService.getwallData().subscribe((data: any) => {
      if (data == null) {
        this.allRewardFeed = '';
      } else {
        this.allRewardFeed = data;
      }
    });
  }
}
