import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhpClaimTabComponent } from './ghp-claim-tab.component';

describe('GhpClaimTabComponent', () => {
  let component: GhpClaimTabComponent;
  let fixture: ComponentFixture<GhpClaimTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhpClaimTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhpClaimTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
