import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCardRentalComponent } from './data-card-rental.component';

describe('DataCardRentalComponent', () => {
  let component: DataCardRentalComponent;
  let fixture: ComponentFixture<DataCardRentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCardRentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCardRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
