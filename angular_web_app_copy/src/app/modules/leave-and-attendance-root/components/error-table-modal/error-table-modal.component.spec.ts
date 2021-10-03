import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorTableModalComponent } from './error-table-modal.component';

describe('ErrorTableModalComponent', () => {
  let component: ErrorTableModalComponent;
  let fixture: ComponentFixture<ErrorTableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorTableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
