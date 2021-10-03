import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementsFormsComponent } from './reimbursements-forms.component';

describe('ReimbursementsFormsComponent', () => {
  let component: ReimbursementsFormsComponent;
  let fixture: ComponentFixture<ReimbursementsFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementsFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
