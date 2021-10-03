import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ad-carousel',
  templateUrl: './ad-carousel.component.html',
  styleUrls: ['./ad-carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdCarouselWidgetComponent implements OnInit {
  ngOnInit(): void {
    console.log('caledar widget onint...');
  }
}
