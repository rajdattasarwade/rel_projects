import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-marketplace-card',
  templateUrl: './marketplace-card.component.html',
  styleUrls: ['./marketplace-card.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MarketplaceCardComponent implements OnInit {
  @Input() lastDate: any;
  @Input() jobDetails: boolean;
  @Input() jobTitle: any;
  @Input() gigData: any;
  // @Input() viewicon: any;
  // @Input() bookmarkicon: any;
  // @Input() forwardicon: any;
  @Input() icons: any;
  alteredData: any;
  @Output() actionEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    let keys = Object.keys(this.gigData);
    let values = Object.values(this.gigData);
    this.alteredData = {
      lastDate: values[0],
      jobTitle: values[1],
      data: [],
    };
    for (let i = 2; i < keys.length; i++) {
      let userObj = {
        key: keys[i],
        value: values[i],
      };
      this.alteredData.data.push(userObj);
    }
  }
  actionFun(action) {
    this.actionEvent.emit(action);
  }
}