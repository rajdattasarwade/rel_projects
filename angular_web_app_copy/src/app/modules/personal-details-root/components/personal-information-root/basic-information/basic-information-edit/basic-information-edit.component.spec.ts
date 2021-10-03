import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInformationEditComponent } from './basic-information-edit.component';

describe('BasicInformationEditComponent', () => {
  let component: BasicInformationEditComponent;
  let fixture: ComponentFixture<BasicInformationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInformationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInformationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
