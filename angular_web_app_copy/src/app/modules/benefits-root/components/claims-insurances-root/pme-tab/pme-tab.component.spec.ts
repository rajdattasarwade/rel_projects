import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmeTabComponent } from './pme-tab.component';

describe('PmeTabComponent', () => {
  let component: PmeTabComponent;
  let fixture: ComponentFixture<PmeTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmeTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
