import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeWearAlloanceComponent } from './office-wear-alloance.component';

describe('OfficeWearAlloanceComponent', () => {
  let component: OfficeWearAlloanceComponent;
  let fixture: ComponentFixture<OfficeWearAlloanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeWearAlloanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeWearAlloanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
