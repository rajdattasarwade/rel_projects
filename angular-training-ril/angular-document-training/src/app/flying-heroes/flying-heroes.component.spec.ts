import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyingHeroesComponent } from './flying-heroes.component';

describe('FlyingHeroesComponent', () => {
  let component: FlyingHeroesComponent;
  let fixture: ComponentFixture<FlyingHeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyingHeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyingHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
