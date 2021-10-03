import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GratuityEncashmentDeclarationComponent } from './gratuity-encashment-declaration.component';

describe('GratuityEncashmentDeclarationComponent', () => {
  let component: GratuityEncashmentDeclarationComponent;
  let fixture: ComponentFixture<GratuityEncashmentDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GratuityEncashmentDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GratuityEncashmentDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
