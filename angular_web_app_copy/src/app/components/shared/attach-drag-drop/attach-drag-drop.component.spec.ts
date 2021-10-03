import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachDragDropComponent } from './attach-drag-drop.component';

describe('AttachDragDropComponent', () => {
  let component: AttachDragDropComponent;
  let fixture: ComponentFixture<AttachDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
