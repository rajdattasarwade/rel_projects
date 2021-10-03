import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRetiralsTabComponent } from './my-retirals-tab.component';

describe('MyRetiralsTabComponent', () => {
  let component: MyRetiralsTabComponent;
  let fixture: ComponentFixture<MyRetiralsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRetiralsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRetiralsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
