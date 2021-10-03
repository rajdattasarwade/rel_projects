import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCreationModalComponent } from './request-creation-modal.component';

describe('RequestCreationModalComponent', () => {
  let component: RequestCreationModalComponent;
  let fixture: ComponentFixture<RequestCreationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCreationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
