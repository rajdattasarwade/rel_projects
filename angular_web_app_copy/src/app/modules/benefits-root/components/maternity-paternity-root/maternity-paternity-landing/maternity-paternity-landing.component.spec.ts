import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityPaternityLandingComponent } from './maternity-paternity-landing.component';

describe('MaternityPaternityLandingComponent', () => {
  let component: MaternityPaternityLandingComponent;
  let fixture: ComponentFixture<MaternityPaternityLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternityPaternityLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternityPaternityLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
