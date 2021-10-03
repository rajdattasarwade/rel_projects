import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedibuddyTabComponent } from './medibuddy-tab.component';

describe('MedibuddyTabComponent', () => {
  let component: MedibuddyTabComponent;
  let fixture: ComponentFixture<MedibuddyTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedibuddyTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedibuddyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
