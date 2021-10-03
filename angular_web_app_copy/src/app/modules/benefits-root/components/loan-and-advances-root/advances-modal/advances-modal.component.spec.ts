import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancesModalComponent } from './advances-modal.component';

describe('AdvancesModalComponent', () => {
  let component: AdvancesModalComponent;
  let fixture: ComponentFixture<AdvancesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
