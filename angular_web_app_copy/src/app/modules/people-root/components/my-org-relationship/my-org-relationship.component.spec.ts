import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrgRelationshipComponent } from './my-org-relationship.component';

describe('MyOrgRelationshipComponent', () => {
  let component: MyOrgRelationshipComponent;
  let fixture: ComponentFixture<MyOrgRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrgRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrgRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
