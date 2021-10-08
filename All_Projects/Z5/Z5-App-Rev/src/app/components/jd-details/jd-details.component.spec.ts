import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdDetailsComponent } from './jd-details.component';

describe('JdDetailsComponent', () => {
  let component: JdDetailsComponent;
  let fixture: ComponentFixture<JdDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
