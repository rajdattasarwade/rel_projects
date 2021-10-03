import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpaClaimModalComponent } from './gpa-claim-modal.component';

describe('GpaClaimModalComponent', () => {
  let component: GpaClaimModalComponent;
  let fixture: ComponentFixture<GpaClaimModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpaClaimModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpaClaimModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
