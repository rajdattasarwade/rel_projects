import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageDetailsModalComponent } from './marriage-details-modal.component';

describe('MarriageDetailsModalComponent', () => {
  let component: MarriageDetailsModalComponent;
  let fixture: ComponentFixture<MarriageDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
