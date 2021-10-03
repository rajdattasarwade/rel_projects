import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section80dComponent } from './section80d.component';

describe('Section80dComponent', () => {
  let component: Section80dComponent;
  let fixture: ComponentFixture<Section80dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section80dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section80dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
