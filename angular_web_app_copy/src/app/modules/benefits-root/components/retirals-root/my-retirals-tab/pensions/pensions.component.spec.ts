import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionsComponent } from './pensions.component';

describe('PensionsComponent', () => {
  let component: PensionsComponent;
  let fixture: ComponentFixture<PensionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
