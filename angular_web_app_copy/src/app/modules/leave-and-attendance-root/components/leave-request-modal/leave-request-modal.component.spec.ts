import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveRequestModalComponent } from './leave-request-modal.component';


describe('LeaveRequestModalComponent', () => {
  let component: LeaveRequestModalComponent;
  let fixture: ComponentFixture<LeaveRequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveRequestModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
