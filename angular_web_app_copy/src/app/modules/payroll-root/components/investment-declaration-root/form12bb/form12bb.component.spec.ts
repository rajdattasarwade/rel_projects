import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form12bbComponent } from './form12bb.component';

describe('Form12bbComponent', () => {
  let component: Form12bbComponent;
  let fixture: ComponentFixture<Form12bbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form12bbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form12bbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
