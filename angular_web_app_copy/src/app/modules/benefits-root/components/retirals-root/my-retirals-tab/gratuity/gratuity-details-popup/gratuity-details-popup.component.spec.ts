import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GratuityDetailsPopupComponent } from './gratuity-details-popup.component';

describe('GratuityDetailsPopupComponent', () => {
  let component: GratuityDetailsPopupComponent;
  let fixture: ComponentFixture<GratuityDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GratuityDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GratuityDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
