import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionalGratuityDetailsComponent } from './provisional-gratuity-details.component';

describe('ProvisionalGratuityDetailsComponent', () => {
  let component: ProvisionalGratuityDetailsComponent;
  let fixture: ComponentFixture<ProvisionalGratuityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionalGratuityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionalGratuityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
