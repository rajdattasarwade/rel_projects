import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsInsurancesRootComponent } from './claims-insurances-root.component';

describe('ClaimsInsurancesRootComponent', () => {
  let component: ClaimsInsurancesRootComponent;
  let fixture: ComponentFixture<ClaimsInsurancesRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsInsurancesRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsInsurancesRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
