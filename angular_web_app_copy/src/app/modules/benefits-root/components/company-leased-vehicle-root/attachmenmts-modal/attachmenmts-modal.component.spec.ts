import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmenmtsModalComponent } from './attachmenmts-modal.component';

describe('AttachmenmtsModalComponent', () => {
  let component: AttachmenmtsModalComponent;
  let fixture: ComponentFixture<AttachmenmtsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmenmtsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmenmtsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
