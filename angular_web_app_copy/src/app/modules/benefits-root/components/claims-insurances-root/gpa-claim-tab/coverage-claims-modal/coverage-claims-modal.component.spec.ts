import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageClaimsModalComponent } from './coverage-claims-modal.component';

describe('CoverageClaimsModalComponent', () => {
  let component: CoverageClaimsModalComponent;
  let fixture: ComponentFixture<CoverageClaimsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverageClaimsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageClaimsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
