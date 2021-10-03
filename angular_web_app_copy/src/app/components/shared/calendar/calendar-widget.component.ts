import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'widget-calendar',
  templateUrl: './calendar-widget.component.html',
  styleUrls: ['./calendar-widget.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarWidgetComponent implements OnInit {
  icon: string = 'open_in_new';
  constructor(private router: Router, private service: CalendarService) {}
  ngOnInit(): void {
    console.log('caledar widget onint...');
    this.icon = this.service.getIcon;
  }
  selectedDate: any;
  onSelect(event) {
    console.log(event);
    this.selectedDate = event;
  }
  routeTo() {
    this.service.navigateToggle();
    let component = this.service.getComponentToRoute;
    console.log('routeTo...' + component);
    this.router.navigate([component]);
  }
  routeToMainComponent() {
    this.router.navigate(['calendar-component']);
  }
}
