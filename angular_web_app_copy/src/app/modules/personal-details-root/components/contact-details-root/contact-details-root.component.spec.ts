import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsRootComponent } from './contact-details-root.component';

describe('ContactDetailsRootComponent', () => {
  let component: ContactDetailsRootComponent;
  let fixture: ComponentFixture<ContactDetailsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
