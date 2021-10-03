import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNominationComponent } from './create-nomination.component';

describe('CreateNominationComponent', () => {
  let component: CreateNominationComponent;
  let fixture: ComponentFixture<CreateNominationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNominationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
