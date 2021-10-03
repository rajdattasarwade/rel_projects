import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoServiceComponent } from './todo-service.component';

describe('TodoServiceComponent', () => {
  let component: TodoServiceComponent;
  let fixture: ComponentFixture<TodoServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
