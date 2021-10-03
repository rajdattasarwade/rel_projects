import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneAndDataCardComponent } from './telephone-and-data-card.component';

describe('TelephoneAndDataCardComponent', () => {
  let component: TelephoneAndDataCardComponent;
  let fixture: ComponentFixture<TelephoneAndDataCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelephoneAndDataCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephoneAndDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
