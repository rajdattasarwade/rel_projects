import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCaptionCardComponent } from './icon-caption-card.component';

describe('IconCaptionCardComponent', () => {
  let component: IconCaptionCardComponent;
  let fixture: ComponentFixture<IconCaptionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconCaptionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCaptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
