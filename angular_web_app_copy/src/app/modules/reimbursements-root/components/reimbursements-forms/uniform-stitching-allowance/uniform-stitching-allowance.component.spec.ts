import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformStitchingAllowanceComponent } from './uniform-stitching-allowance.component';

describe('UniformStitchingAllowanceComponent', () => {
  let component: UniformStitchingAllowanceComponent;
  let fixture: ComponentFixture<UniformStitchingAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniformStitchingAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniformStitchingAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
