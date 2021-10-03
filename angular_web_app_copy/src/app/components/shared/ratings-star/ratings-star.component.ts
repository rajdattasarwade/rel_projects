import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ratings-star',
  templateUrl: './ratings-star.component.html',
  styleUrls: ['./ratings-star.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RatingsStarComponent implements OnInit {

  @Input() readOnly: boolean;
  @Input() rating: any;
  @Input() size: any;
  @Output() onRatingChange = new EventEmitter();
  @Output() onClick = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onRatingChangeFunc(event) {
    this.onRatingChange.emit(event.rating);
  }

}
