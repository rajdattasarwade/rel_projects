import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredToMeTabComponent } from './referred-to-me-tab.component';

describe('ReferredToMeTabComponent', () => {
  let component: ReferredToMeTabComponent;
  let fixture: ComponentFixture<ReferredToMeTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferredToMeTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferredToMeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
