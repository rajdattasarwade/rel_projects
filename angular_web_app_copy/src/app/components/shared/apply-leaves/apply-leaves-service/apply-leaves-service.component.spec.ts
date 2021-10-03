import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLeavesServiceComponent } from './apply-leaves-service.component';

describe('ApplyLeavesServiceComponent', () => {
  let component: ApplyLeavesServiceComponent;
  let fixture: ComponentFixture<ApplyLeavesServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyLeavesServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLeavesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
