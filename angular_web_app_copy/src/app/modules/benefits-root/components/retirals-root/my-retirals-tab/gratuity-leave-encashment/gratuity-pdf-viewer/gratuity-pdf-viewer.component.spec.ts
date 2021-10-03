import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GratuityPdfViewerComponent } from './gratuity-pdf-viewer.component';

describe('GratuityPdfViewerComponent', () => {
  let component: GratuityPdfViewerComponent;
  let fixture: ComponentFixture<GratuityPdfViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GratuityPdfViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GratuityPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
