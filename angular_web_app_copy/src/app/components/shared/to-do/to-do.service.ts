import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ToDoService {
  constructor(private httpClient: HttpClient) {}

  getToDos(): Observable<any> {
    return this.httpClient.get('assets/TODO.json');
  }
}
