import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericWithdrawalFormComponent } from './generic-withdrawal-form.component';

describe('GenericWithdrawalFormComponent', () => {
  let component: GenericWithdrawalFormComponent;
  let fixture: ComponentFixture<GenericWithdrawalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericWithdrawalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericWithdrawalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
