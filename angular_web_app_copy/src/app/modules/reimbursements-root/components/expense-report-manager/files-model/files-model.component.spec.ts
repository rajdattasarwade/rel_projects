import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesModelComponent } from './files-model.component';

describe('FilesModelComponent', () => {
  let component: FilesModelComponent;
  let fixture: ComponentFixture<FilesModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
