import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalConveyanceComponent } from './local-conveyance.component';

describe('LocalConveyanceComponent', () => {
  let component: LocalConveyanceComponent;
  let fixture: ComponentFixture<LocalConveyanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalConveyanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalConveyanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
