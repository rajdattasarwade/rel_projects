import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiralsRootComponent } from './retirals-root.component';

describe('RetiralsRootComponent', () => {
  let component: RetiralsRootComponent;
  let fixture: ComponentFixture<RetiralsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiralsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiralsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
