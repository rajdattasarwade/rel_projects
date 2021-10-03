import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
