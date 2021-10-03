import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-calendar',
  templateUrl: './header-calendar.component.html',
  styleUrls: ['./header-calendar.component.css'],
})
export class HeaderCalendarComponent implements OnInit {
  @Output() showCalendarView = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  selectCalendarView(opr) {
    this.showCalendarView.emit(opr);
    if (opr == 'list') {
      document.getElementById('tile').classList.remove('active-tile');
      document.getElementById(opr).classList.add('active-tile');
    } else {
      document.getElementById('list').classList.remove('active-tile');
      document.getElementById(opr).classList.add('active-tile');
    }
  }
}
