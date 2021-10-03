import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtCoffStatusComponent } from './ot-coff-status.component';

describe('OtCoffStatusComponent', () => {
  let component: OtCoffStatusComponent;
  let fixture: ComponentFixture<OtCoffStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtCoffStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtCoffStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
