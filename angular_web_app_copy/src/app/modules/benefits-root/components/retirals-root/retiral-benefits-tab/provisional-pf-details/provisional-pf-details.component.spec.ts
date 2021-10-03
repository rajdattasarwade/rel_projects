import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionalPfDetailsComponent } from './provisional-pf-details.component';

describe('ProvisionalPfDetailsComponent', () => {
  let component: ProvisionalPfDetailsComponent;
  let fixture: ComponentFixture<ProvisionalPfDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionalPfDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionalPfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
