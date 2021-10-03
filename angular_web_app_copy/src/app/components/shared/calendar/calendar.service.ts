import { Injectable } from '@angular/core';

@Injectable()
export class CalendarService {
  icon: string;
  flag: boolean;
  componentToRoute: string;
  constructor() {
    this.icon = 'open_in_new';
    this.flag = false;
    this.componentToRoute = 'calendar';
  }

  navigateToggle() {
    this.flag = !this.flag;
    if (!this.flag) {
      this.componentToRoute = '';
      this.icon = 'open_in_new';
    } else {
      this.componentToRoute = 'calendar';
      this.icon = 'transit_enterexit';
    }
  }

  get getIcon() {
    return this.icon;
  }
  get getComponentToRoute() {
    return this.componentToRoute;
  }
}
