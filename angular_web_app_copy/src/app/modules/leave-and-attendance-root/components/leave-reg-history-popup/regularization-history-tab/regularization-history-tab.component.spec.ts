import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizationHistoryTabComponent } from './regularization-history-tab.component';

describe('RegularizationHistoryTabComponent', () => {
  let component: RegularizationHistoryTabComponent;
  let fixture: ComponentFixture<RegularizationHistoryTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularizationHistoryTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularizationHistoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
