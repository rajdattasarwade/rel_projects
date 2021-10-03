import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GratuityFormulaPopupComponent } from './gratuity-formula-popup.component';

describe('GratuityFormulaPopupComponent', () => {
  let component: GratuityFormulaPopupComponent;
  let fixture: ComponentFixture<GratuityFormulaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GratuityFormulaPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GratuityFormulaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
