import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmeReportsModalComponent } from './pme-reports-modal.component';

describe('PmeReportsModalComponent', () => {
  let component: PmeReportsModalComponent;
  let fixture: ComponentFixture<PmeReportsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmeReportsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmeReportsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
