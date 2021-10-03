import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedTabComponent } from './applied-tab.component';

describe('AppliedTabComponent', () => {
  let component: AppliedTabComponent;
  let fixture: ComponentFixture<AppliedTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
