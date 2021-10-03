import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalRoamingServicesComponent } from './international-roaming-services.component';

describe('InternationalRoamingServicesComponent', () => {
  let component: InternationalRoamingServicesComponent;
  let fixture: ComponentFixture<InternationalRoamingServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalRoamingServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalRoamingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
