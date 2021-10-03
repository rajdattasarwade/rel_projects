import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitAllowanceComponent } from './kit-allowance.component';

describe('KitAllowanceComponent', () => {
  let component: KitAllowanceComponent;
  let fixture: ComponentFixture<KitAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
