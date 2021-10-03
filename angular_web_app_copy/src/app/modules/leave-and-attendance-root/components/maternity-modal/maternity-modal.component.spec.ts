import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityModalComponent } from './maternity-modal.component';

describe('MaternityModalComponent', () => {
  let component: MaternityModalComponent;
  let fixture: ComponentFixture<MaternityModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternityModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
