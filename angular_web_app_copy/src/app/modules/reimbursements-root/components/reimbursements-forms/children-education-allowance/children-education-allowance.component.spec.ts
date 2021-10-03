import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { childrenEducationAllowanceComponent } from './children-education-allowance.component';

describe('childrenEducationAllowanceComponent', () => {
  let component: childrenEducationAllowanceComponent;
  let fixture: ComponentFixture<childrenEducationAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [childrenEducationAllowanceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(childrenEducationAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
