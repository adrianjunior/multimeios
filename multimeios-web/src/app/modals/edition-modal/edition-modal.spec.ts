import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionModal } from './edition-modal';

describe('EditionModal', () => {
  let component: EditionModal;
  let fixture: ComponentFixture<EditionModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
