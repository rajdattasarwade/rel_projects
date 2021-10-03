import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgDirectoryServiceComponent } from './org-directory-service.component';

describe('OrgDirectoryServiceComponent', () => {
  let component: OrgDirectoryServiceComponent;
  let fixture: ComponentFixture<OrgDirectoryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgDirectoryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDirectoryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
