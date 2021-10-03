import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutcartComponent } from './donutcart.component';

describe('DonutcartComponent', () => {
  let component: DonutcartComponent;
  let fixture: ComponentFixture<DonutcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
