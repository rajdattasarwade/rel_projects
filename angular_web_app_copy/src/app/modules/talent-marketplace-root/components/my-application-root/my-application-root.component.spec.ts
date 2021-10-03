import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApplicationRootComponent } from './my-application-root.component';

describe('MyApplicationRootComponent', () => {
  let component: MyApplicationRootComponent;
  let fixture: ComponentFixture<MyApplicationRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyApplicationRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApplicationRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
