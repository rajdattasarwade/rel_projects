import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GratuityLeaveEncashmentComponent } from './gratuity-leave-encashment.component';

describe('GratuityLeaveEncashmentComponent', () => {
  let component: GratuityLeaveEncashmentComponent;
  let fixture: ComponentFixture<GratuityLeaveEncashmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GratuityLeaveEncashmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GratuityLeaveEncashmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
