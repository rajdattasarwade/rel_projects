import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsicTabComponent } from './esic-tab.component';

describe('EsicTabComponent', () => {
  let component: EsicTabComponent;
  let fixture: ComponentFixture<EsicTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsicTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsicTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
