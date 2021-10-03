import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrRequestCreationModalComponent } from './ir-request-creation-modal.component';

describe('IrRequestCreationModalComponent', () => {
  let component: IrRequestCreationModalComponent;
  let fixture: ComponentFixture<IrRequestCreationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrRequestCreationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrRequestCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
