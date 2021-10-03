import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialStatusEditComponent } from './martial-status-edit.component';

describe('MartialStatusEditComponent', () => {
  let component: MartialStatusEditComponent;
  let fixture: ComponentFixture<MartialStatusEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MartialStatusEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MartialStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
