import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmeCentersModalComponent } from './pme-centers-modal.component';

describe('PmeCentersModalComponent', () => {
  let component: PmeCentersModalComponent;
  let fixture: ComponentFixture<PmeCentersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmeCentersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmeCentersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
