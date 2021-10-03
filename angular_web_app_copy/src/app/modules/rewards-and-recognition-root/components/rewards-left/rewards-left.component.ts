import { Component, OnInit } from '@angular/core';
import { RewardsAndRecognitionService } from '../../rewards-and-recognition.service';

@Component({
  selector: 'app-rewards-left',
  templateUrl: './rewards-left.component.html',
  styleUrls: ['./rewards-left.component.css'],
})
export class RewardsLeftComponent implements OnInit {
  rewardsGiven: number = 0;
  rewardsReceived: number = 0;
  nominationsGiven: number = 0;
  nominationsReceived: number = 0;
  displayRewards: number = 0;
  displayNomination: number = 0;
  constructor(private rewardsViewService: RewardsAndRecognitionService) {}

  ngOnInit(): void {
    this.getrewardGiven();
    this.getrecognizeReceived();
  }

  getrewardGiven() {
    this.rewardsViewService.getrewardGivenData().subscribe((data: any) => {
      this.getrecognizeGiven();
      if (data == null) {
        this.rewardsGiven = 0;
      } else {
        this.rewardsGiven = data.length;
      }
    });
  }
  getrecognizeGiven() {
    this.rewardsViewService.getrecognizeGivenData().subscribe((data: any) => {
      if (data == null) {
        this.nominationsGiven = 0;
      } else {
        this.nominationsGiven = data.length;
      }
      this.displayNomination = this.rewardsGiven + this.nominationsGiven;
    });
  }

  getrecognizeReceived() {
    this.rewardsViewService
      .getrecognizeReceivedData()
      .subscribe((data: any) => {
        this.getrewardReceived();
        if (data == null) {
          this.nominationsReceived = 0;
        } else {
          this.nominationsReceived = data.length;
        }
      });
  }

  getrewardReceived() {
    this.rewardsViewService.getrewardReceivedData().subscribe((data: any) => {
      if (data == null) {
        this.rewardsReceived = 0;
      } else {
        this.rewardsReceived = data.length;
      }
      this.displayRewards = this.rewardsReceived + this.nominationsReceived;
    });
  }
}
