import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.css']
})
export class HeaderCardComponent implements OnInit {
  @Input() headerText: any;
  @Input() icon: any;
  @Input() iconText: any;
  @Input() icons: any;
  @Output() actionEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  actionFun(action) {
    this.actionEvent.emit(action);
  }
}
