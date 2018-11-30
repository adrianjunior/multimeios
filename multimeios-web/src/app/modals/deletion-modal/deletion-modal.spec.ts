import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletionModal } from './deletion-modal';

describe('DeletionModal', () => {
  let component: DeletionModal;
  let fixture: ComponentFixture<DeletionModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletionModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
