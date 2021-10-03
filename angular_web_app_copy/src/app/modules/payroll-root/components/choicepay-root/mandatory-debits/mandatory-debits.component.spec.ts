import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatoryDebitsComponent } from './mandatory-debits.component';

describe('MandatoryDebitsComponent', () => {
  let component: MandatoryDebitsComponent;
  let fixture: ComponentFixture<MandatoryDebitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandatoryDebitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatoryDebitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
