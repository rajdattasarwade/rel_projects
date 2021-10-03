import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanCardEditComponent } from './pan-card-edit.component';

describe('PanCardEditComponent', () => {
  let component: PanCardEditComponent;
  let fixture: ComponentFixture<PanCardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanCardEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
