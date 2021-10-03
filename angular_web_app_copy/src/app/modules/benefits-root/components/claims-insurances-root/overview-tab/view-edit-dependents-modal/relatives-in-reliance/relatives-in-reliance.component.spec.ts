import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativesInRelianceComponent } from './relatives-in-reliance.component';

describe('RelativesInRelianceComponent', () => {
  let component: RelativesInRelianceComponent;
  let fixture: ComponentFixture<RelativesInRelianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelativesInRelianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativesInRelianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
