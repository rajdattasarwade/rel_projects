import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReedemComponent } from './reedem.component';

describe('ReedemComponent', () => {
  let component: ReedemComponent;
  let fixture: ComponentFixture<ReedemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReedemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReedemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
