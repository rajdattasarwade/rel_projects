import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsdActivationModalComponent } from './isd-activation-modal.component';

describe('IsdActivationModalComponent', () => {
  let component: IsdActivationModalComponent;
  let fixture: ComponentFixture<IsdActivationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsdActivationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsdActivationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
