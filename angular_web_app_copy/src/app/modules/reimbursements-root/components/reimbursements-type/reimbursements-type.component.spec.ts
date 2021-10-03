import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementsTypeComponent } from './reimbursements-type.component';

describe('ReimbursementsTypeComponent', () => {
  let component: ReimbursementsTypeComponent;
  let fixture: ComponentFixture<ReimbursementsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
