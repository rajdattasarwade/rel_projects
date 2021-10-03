import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.css'],
})
export class TodoWidgetComponent implements OnInit {
  panelOpenState = true;
  storeTodoList: any;
  constructor(public router: Router, private todoService: ToDoService) {}

  ngOnInit(): void {
    this.todoService.getToDos().subscribe(
      (data) => {
        if (data) {
          this.storeTodoList = data;
        }
      },
      (error) => {
        console.log();
      }
    );
  }

  routeToMainComponent() {
    this.router.navigate(['todo']);
  }
}
