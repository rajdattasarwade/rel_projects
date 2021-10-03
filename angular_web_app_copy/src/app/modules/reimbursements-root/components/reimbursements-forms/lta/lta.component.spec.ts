import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtaComponent } from './lta.component';

describe('LtaComponent', () => {
  let component: LtaComponent;
  let fixture: ComponentFixture<LtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
