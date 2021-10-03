import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAttachPdfComponent } from './multi-attach-pdf.component';

describe('MultiAttachPdfComponent', () => {
  let component: MultiAttachPdfComponent;
  let fixture: ComponentFixture<MultiAttachPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiAttachPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiAttachPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
