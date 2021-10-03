import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePfTransferFormComponent } from './create-pf-transfer-form.component';

describe('CreatePfTransferFormComponent', () => {
  let component: CreatePfTransferFormComponent;
  let fixture: ComponentFixture<CreatePfTransferFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePfTransferFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePfTransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
