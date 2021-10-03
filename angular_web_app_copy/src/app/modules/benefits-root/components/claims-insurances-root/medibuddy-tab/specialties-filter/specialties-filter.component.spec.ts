import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesFilterComponent } from './specialties-filter.component';

describe('SpecialtiesFilterComponent', () => {
  let component: SpecialtiesFilterComponent;
  let fixture: ComponentFixture<SpecialtiesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtiesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtiesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
