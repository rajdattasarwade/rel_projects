import { Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import { EmployeeEngagementService } from '../../employee-engagement.service';
import { UserEvents } from '../../models/user-events.model';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit, OnDestroy {
  userEvents: UserEvents[];
  birthdayCount: number = 0;
  workAnniversaryCount: number = 0;
  public subscriptionsList: Subscription[]=[];
  constructor(private empService: EmployeeEngagementService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this.subscriptionsList.push(forkJoin([this.empService.getTodaysEventsManager(), this.empService.getTodaysEventsBU()]).subscribe((data: UserEvents[]) => {
      this.userEvents = data;
      this.birthdayCount = this.userEvents[0].birthdays.length + this.userEvents[1].birthdays.length;
      this.workAnniversaryCount = this.userEvents[0].birthdays.length + this.userEvents[1].birthdays.length;
      
    }))
  }
  ngOnDestroy(){
    if(this.subscriptionsList.length > 0) this.subscriptionsList.forEach(subscription => { subscription.unsubscribe() })
  }

}
