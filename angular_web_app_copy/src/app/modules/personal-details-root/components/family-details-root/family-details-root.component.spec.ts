import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDetailsRootComponent } from './family-details-root.component';

describe('FamilyDetailsRootComponent', () => {
  let component: FamilyDetailsRootComponent;
  let fixture: ComponentFixture<FamilyDetailsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyDetailsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyDetailsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
