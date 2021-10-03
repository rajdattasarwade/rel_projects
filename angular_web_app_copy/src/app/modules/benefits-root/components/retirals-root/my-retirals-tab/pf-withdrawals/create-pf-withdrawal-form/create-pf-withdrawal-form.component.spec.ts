import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePfWithdrawalFormComponent } from './create-pf-withdrawal-form.component';

describe('CreatePfWithdrawalFormComponent', () => {
  let component: CreatePfWithdrawalFormComponent;
  let fixture: ComponentFixture<CreatePfWithdrawalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePfWithdrawalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePfWithdrawalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
