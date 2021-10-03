import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompOffLeaveDetailsComponent } from './comp-off-leave-details.component';

describe('CompOffLeaveDetailsComponent', () => {
  let component: CompOffLeaveDetailsComponent;
  let fixture: ComponentFixture<CompOffLeaveDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompOffLeaveDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompOffLeaveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
