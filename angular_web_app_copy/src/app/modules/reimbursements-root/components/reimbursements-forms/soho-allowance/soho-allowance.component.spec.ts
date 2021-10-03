import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SohoAllowanceComponent } from './soho-allowance.component';

describe('SohoAllowanceComponent', () => {
  let component: SohoAllowanceComponent;
  let fixture: ComponentFixture<SohoAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SohoAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SohoAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
