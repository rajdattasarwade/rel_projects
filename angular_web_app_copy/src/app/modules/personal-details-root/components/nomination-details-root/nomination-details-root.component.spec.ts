import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationDetailsRootComponent } from './nomination-details-root.component';

describe('NominationDetailsRootComponent', () => {
  let component: NominationDetailsRootComponent;
  let fixture: ComponentFixture<NominationDetailsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationDetailsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationDetailsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
