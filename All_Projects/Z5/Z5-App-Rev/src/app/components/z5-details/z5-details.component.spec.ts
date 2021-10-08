import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Z5DetailsComponent } from './z5-details.component';

describe('Z5DetailsComponent', () => {
  let component: Z5DetailsComponent;
  let fixture: ComponentFixture<Z5DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Z5DetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Z5DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
