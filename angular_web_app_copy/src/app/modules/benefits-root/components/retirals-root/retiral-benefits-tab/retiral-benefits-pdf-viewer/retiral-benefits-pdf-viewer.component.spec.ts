import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiralBenefitsPdfViewerComponent } from './retiral-benefits-pdf-viewer.component';

describe('RetiralBenefitsPdfViewerComponent', () => {
  let component: RetiralBenefitsPdfViewerComponent;
  let fixture: ComponentFixture<RetiralBenefitsPdfViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiralBenefitsPdfViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiralBenefitsPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
