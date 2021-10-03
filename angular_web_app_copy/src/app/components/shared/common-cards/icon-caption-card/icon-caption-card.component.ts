import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-caption-card',
  templateUrl: './icon-caption-card.component.html',
  styleUrls: ['./icon-caption-card.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class IconCaptionCardComponent implements OnInit {

  @Input() imgUrl: any;
  @Input() captionText: any;
  @Input() imgClass: any;
  @Output() actionIconEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  routToService(){
    this.actionIconEvent.emit();
  }
}
