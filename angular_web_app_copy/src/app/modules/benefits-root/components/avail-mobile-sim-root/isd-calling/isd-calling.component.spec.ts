import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsdCallingComponent } from './isd-calling.component';

describe('IsdCallingComponent', () => {
  let component: IsdCallingComponent;
  let fixture: ComponentFixture<IsdCallingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsdCallingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsdCallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
