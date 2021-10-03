import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewPostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
