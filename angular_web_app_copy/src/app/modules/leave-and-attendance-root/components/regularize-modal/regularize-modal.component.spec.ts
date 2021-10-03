import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizeModalComponent } from './regularize-modal.component';

describe('RegularizeModalComponent', () => {
  let component: RegularizeModalComponent;
  let fixture: ComponentFixture<RegularizeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularizeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularizeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
