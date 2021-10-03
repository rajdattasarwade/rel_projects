import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrmbTabComponent } from './prmb-tab.component';

describe('PrmbTabComponent', () => {
  let component: PrmbTabComponent;
  let fixture: ComponentFixture<PrmbTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrmbTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrmbTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
