import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderCardComponent } from './sub-header-card.component';

describe('SubHeaderCardComponent', () => {
  let component: SubHeaderCardComponent;
  let fixture: ComponentFixture<SubHeaderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubHeaderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
