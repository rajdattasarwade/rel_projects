import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfPensionInfoPopupComponent } from './pf-pension-info-popup.component';

describe('PfPensionInfoPopupComponent', () => {
  let component: PfPensionInfoPopupComponent;
  let fixture: ComponentFixture<PfPensionInfoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfPensionInfoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfPensionInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
