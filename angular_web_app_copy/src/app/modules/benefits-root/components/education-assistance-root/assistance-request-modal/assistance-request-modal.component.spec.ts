import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceRequestModalComponent } from './assistance-request-modal.component';

describe('AssistanceRequestModalComponent', () => {
  let component: AssistanceRequestModalComponent;
  let fixture: ComponentFixture<AssistanceRequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistanceRequestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
