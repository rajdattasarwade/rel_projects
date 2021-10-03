import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpaClaimTabComponent } from './gpa-claim-tab.component';

describe('GpaClaimTabComponent', () => {
  let component: GpaClaimTabComponent;
  let fixture: ComponentFixture<GpaClaimTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpaClaimTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpaClaimTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
