import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenHostelAllowanceComponent } from './children-hostel-allowance.component';

describe('ChildrenHostelAllowanceComponent', () => {
  let component: ChildrenHostelAllowanceComponent;
  let fixture: ComponentFixture<ChildrenHostelAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenHostelAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenHostelAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
