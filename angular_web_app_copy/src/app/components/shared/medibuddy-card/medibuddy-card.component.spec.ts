import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedibuddyCardComponent } from './medibuddy-card.component';

describe('MedibuddyCardComponent', () => {
  let component: MedibuddyCardComponent;
  let fixture: ComponentFixture<MedibuddyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedibuddyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedibuddyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
