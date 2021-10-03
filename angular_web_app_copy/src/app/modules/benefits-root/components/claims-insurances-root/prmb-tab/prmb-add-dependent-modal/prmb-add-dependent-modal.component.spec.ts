import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrmbAddDependentModalComponent } from './prmb-add-dependent-modal.component';

describe('PrmbAddDependentModalComponent', () => {
  let component: PrmbAddDependentModalComponent;
  let fixture: ComponentFixture<PrmbAddDependentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrmbAddDependentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrmbAddDependentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
