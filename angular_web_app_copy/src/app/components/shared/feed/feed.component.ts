import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  members: {
    name: string;
    title: string;
    subtitle: string;
    url: string;
    EventType: string;
  }[] = [
    {
      name: 'Vikram virk',
      title: 'has invited you to join jio conference standup-up today',
      subtitle: 'Today at 12:22 AM',
      url: '',
      EventType: 'Invite',
    },
    {
      name: "Mellisa's",
      title:
        ' birthday today!Send her your regards by gifting her card from jio portal',
      subtitle: 'Yesterday 10:11 AM',
      url: '',
      EventType: 'Wish',
    },
    {
      name: 'Brad Weiss',
      title: 'recommended you for Outstanding employee Award!!',
      subtitle: 'Today 12:30 PM',
      url: 'assets/images/employee-award-titles.png',
      EventType: '',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
