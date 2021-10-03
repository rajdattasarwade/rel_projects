import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgDirectoryWidgetComponent } from './org-directory-widget.component';

describe('OrgDirectoryWidgetComponent', () => {
  let component: OrgDirectoryWidgetComponent;
  let fixture: ComponentFixture<OrgDirectoryWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgDirectoryWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDirectoryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
