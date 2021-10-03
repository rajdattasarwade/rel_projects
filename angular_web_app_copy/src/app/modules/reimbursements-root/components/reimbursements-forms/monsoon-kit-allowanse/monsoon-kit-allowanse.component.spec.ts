import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsoonKitAllowanseComponent } from './monsoon-kit-allowanse.component';

describe('MonsoonKitAllowanseComponent', () => {
  let component: MonsoonKitAllowanseComponent;
  let fixture: ComponentFixture<MonsoonKitAllowanseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsoonKitAllowanseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsoonKitAllowanseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
