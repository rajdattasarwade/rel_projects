import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sub-header-card',
  templateUrl: './sub-header-card.component.html',
  styleUrls: ['./sub-header-card.component.css']
})
export class SubHeaderCardComponent implements OnInit {

  @Input() headerText: any;
  @Input() icons: any;
  @Input() badgeText: any;
  @Input() badgeClass: any;
  @Output() actionEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  actionFunc(action) {
    this.actionEvent.emit(action);
  }

}
