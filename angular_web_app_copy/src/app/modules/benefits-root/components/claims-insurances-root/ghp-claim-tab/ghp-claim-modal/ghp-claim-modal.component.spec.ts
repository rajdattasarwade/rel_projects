import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhpClaimModalComponent } from './ghp-claim-modal.component';

describe('GhpClaimModalComponent', () => {
  let component: GhpClaimModalComponent;
  let fixture: ComponentFixture<GhpClaimModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhpClaimModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhpClaimModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
