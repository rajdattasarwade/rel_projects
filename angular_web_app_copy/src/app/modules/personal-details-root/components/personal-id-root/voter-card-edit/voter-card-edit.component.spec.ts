import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterCardEditComponent } from './voter-card-edit.component';

describe('VoterCardEditComponent', () => {
  let component: VoterCardEditComponent;
  let fixture: ComponentFixture<VoterCardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterCardEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
