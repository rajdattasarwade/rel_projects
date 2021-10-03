import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantDateRootComponent } from './important-date-root.component';

describe('ImportantDateRootComponent', () => {
  let component: ImportantDateRootComponent;
  let fixture: ComponentFixture<ImportantDateRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantDateRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantDateRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
