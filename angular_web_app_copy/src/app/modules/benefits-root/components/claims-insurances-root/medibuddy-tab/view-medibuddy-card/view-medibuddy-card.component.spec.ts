import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedibuddyCardComponent } from './view-medibuddy-card.component';

describe('ViewMedibuddyCardComponent', () => {
  let component: ViewMedibuddyCardComponent;
  let fixture: ComponentFixture<ViewMedibuddyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMedibuddyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMedibuddyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
