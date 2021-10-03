import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffAvailedComponent } from './coff-availed.component';

describe('CoffAvailedComponent', () => {
  let component: CoffAvailedComponent;
  let fixture: ComponentFixture<CoffAvailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffAvailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffAvailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
