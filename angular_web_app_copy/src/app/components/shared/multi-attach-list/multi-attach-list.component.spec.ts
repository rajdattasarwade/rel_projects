import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAttachListComponent } from './multi-attach-list.component';

describe('MultiAttachListComponent', () => {
  let component: MultiAttachListComponent;
  let fixture: ComponentFixture<MultiAttachListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiAttachListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiAttachListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
