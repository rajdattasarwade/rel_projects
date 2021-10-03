import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClvViewModalComponent } from './clv-view-modal.component';

describe('ClvViewModalComponent', () => {
  let component: ClvViewModalComponent;
  let fixture: ComponentFixture<ClvViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClvViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClvViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
