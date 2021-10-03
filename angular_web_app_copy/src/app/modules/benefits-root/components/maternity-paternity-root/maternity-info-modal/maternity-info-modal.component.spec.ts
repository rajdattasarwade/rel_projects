import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityInfoModalComponent } from './maternity-info-modal.component';

describe('MaternityInfoModalComponent', () => {
  let component: MaternityInfoModalComponent;
  let fixture: ComponentFixture<MaternityInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternityInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternityInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
