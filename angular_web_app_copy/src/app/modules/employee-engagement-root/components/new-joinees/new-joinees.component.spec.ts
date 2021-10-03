import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJoineesComponent } from './new-joinees.component';

describe('NewJoineesComponent', () => {
  let component: NewJoineesComponent;
  let fixture: ComponentFixture<NewJoineesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewJoineesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJoineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
