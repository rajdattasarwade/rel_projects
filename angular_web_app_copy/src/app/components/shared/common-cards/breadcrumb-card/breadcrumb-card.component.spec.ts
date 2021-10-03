import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbCardComponent } from './breadcrumb-card.component';

describe('BreadcrumbCardComponent', () => {
  let component: BreadcrumbCardComponent;
  let fixture: ComponentFixture<BreadcrumbCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
