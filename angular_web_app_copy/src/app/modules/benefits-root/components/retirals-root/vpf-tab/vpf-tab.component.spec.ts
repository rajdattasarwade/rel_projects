import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpfTabComponent } from './vpf-tab.component';

describe('VpfTabComponent', () => {
  let component: VpfTabComponent;
  let fixture: ComponentFixture<VpfTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpfTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpfTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
