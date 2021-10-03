import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuRootComponent } from './submenu-root.component';

describe('SubmenuRootComponent', () => {
  let component: SubmenuRootComponent;
  let fixture: ComponentFixture<SubmenuRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
