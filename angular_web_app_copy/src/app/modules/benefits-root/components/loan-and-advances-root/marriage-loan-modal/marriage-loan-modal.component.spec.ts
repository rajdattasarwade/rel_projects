import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageLoanModalComponent } from './marriage-loan-modal.component';

describe('MarriageLoanModalComponent', () => {
  let component: MarriageLoanModalComponent;
  let fixture: ComponentFixture<MarriageLoanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageLoanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageLoanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
