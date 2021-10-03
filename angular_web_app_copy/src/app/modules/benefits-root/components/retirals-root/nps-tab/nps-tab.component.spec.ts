import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsTabComponent } from './nps-tab.component';

describe('NpsTabComponent', () => {
  let component: NpsTabComponent;
  let fixture: ComponentFixture<NpsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
