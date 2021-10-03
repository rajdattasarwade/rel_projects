import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPayStatementServiceComponent } from './total-pay-statement-service.component';

describe('TotalPayStatementServiceComponent', () => {
  let component: TotalPayStatementServiceComponent;
  let fixture: ComponentFixture<TotalPayStatementServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TotalPayStatementServiceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPayStatementServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
