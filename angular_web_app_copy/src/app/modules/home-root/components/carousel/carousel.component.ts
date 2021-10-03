import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel-widget',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  constructor() {}
  slides = [
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
  ];
  ngOnInit(): void {}
}
