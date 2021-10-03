import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTravelComponent } from './manager-travel.component';

describe('ManagerTravelComponent', () => {
  let component: ManagerTravelComponent;
  let fixture: ComponentFixture<ManagerTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
