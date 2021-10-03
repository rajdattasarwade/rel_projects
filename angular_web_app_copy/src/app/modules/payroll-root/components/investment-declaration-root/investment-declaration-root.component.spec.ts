import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentDeclarationRootComponent } from './investment-declaration-root.component';

describe('InvestmentDeclarationRootComponent', () => {
  let component: InvestmentDeclarationRootComponent;
  let fixture: ComponentFixture<InvestmentDeclarationRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentDeclarationRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentDeclarationRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
