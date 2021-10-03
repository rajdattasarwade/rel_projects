import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisonalSuperannuationDetailsComponent } from './provisonal-superannuation-details.component';

describe('ProvisonalSuperannuationDetailsComponent', () => {
  let component: ProvisonalSuperannuationDetailsComponent;
  let fixture: ComponentFixture<ProvisonalSuperannuationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisonalSuperannuationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisonalSuperannuationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
