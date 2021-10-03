import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSimModalComponent } from './confirmation-sim-modal.component';

describe('ConfirmationSimModalComponent', () => {
  let component: ConfirmationSimModalComponent;
  let fixture: ComponentFixture<ConfirmationSimModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationSimModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationSimModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
