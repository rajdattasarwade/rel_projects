import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompensationDetailsServiceComponent } from './my-compensation-details-service.component';

describe('MyCompensationDetailsServiceComponent', () => {
  let component: MyCompensationDetailsServiceComponent;
  let fixture: ComponentFixture<MyCompensationDetailsServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyCompensationDetailsServiceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCompensationDetailsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
