import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-comp-off-widget',
  templateUrl: './comp-off-widget.component.html',
  styleUrls: ['./comp-off-widget.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class CompOffWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
