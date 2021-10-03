import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superannuation-tab',
  templateUrl: './superannuation-tab.component.html',
  styleUrls: ['./superannuation-tab.component.css']
})
export class SuperannuationTabComponent implements OnInit {
  tabIndex: any;
  constructor() { }

  ngOnInit(): void {
    this.tabIndex=0
  }

  tabChange(event){
    this.tabIndex=event.index
  }

}
