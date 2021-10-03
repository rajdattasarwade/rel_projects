import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTotalPayStatementComponent } from './view-total-pay-statement.component';

describe('ViewTotalPayStatementComponent', () => {
  let component: ViewTotalPayStatementComponent;
  let fixture: ComponentFixture<ViewTotalPayStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTotalPayStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTotalPayStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
