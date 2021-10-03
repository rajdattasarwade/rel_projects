import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageWithdrawalFormComponent } from './marriage-withdrawal-form.component';

describe('MarriageWithdrawalFormComponent', () => {
  let component: MarriageWithdrawalFormComponent;
  let fixture: ComponentFixture<MarriageWithdrawalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageWithdrawalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageWithdrawalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
