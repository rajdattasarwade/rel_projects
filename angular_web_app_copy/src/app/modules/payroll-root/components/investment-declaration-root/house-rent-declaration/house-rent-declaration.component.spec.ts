import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRentDeclarationComponent } from './house-rent-declaration.component';

describe('HouseRentDeclarationComponent', () => {
  let component: HouseRentDeclarationComponent;
  let fixture: ComponentFixture<HouseRentDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseRentDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRentDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
