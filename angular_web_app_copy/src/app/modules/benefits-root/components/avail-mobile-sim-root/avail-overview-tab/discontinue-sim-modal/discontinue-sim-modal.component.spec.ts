import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscontinueSimModalComponent } from './discontinue-sim-modal.component';

describe('DiscontinueSimModalComponent', () => {
  let component: DiscontinueSimModalComponent;
  let fixture: ComponentFixture<DiscontinueSimModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscontinueSimModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscontinueSimModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
