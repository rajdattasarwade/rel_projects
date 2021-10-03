import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperannuationTabComponent } from './superannuation-tab.component';

describe('SuperannuationTabComponent', () => {
  let component: SuperannuationTabComponent;
  let fixture: ComponentFixture<SuperannuationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperannuationTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperannuationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
