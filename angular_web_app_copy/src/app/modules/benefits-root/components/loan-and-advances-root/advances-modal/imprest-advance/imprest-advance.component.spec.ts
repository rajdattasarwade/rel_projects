import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprestAdvanceComponent } from './imprest-advance.component';

describe('ImprestAdvanceComponent', () => {
  let component: ImprestAdvanceComponent;
  let fixture: ComponentFixture<ImprestAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprestAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprestAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
