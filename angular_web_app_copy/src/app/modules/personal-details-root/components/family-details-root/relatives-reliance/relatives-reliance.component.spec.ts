import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativesRelianceComponent } from './relatives-reliance.component';

describe('RelativesRelianceComponent', () => {
  let component: RelativesRelianceComponent;
  let fixture: ComponentFixture<RelativesRelianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelativesRelianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativesRelianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
