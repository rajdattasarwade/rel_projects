import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailMobileSimRootComponent } from './avail-mobile-sim-root.component';

describe('AvailMobileSimRootComponent', () => {
  let component: AvailMobileSimRootComponent;
  let fixture: ComponentFixture<AvailMobileSimRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailMobileSimRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailMobileSimRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
