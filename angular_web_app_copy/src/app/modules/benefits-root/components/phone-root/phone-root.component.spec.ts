import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneRootComponent } from './phone-root.component';

describe('PhoneRootComponent', () => {
  let component: PhoneRootComponent;
  let fixture: ComponentFixture<PhoneRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
