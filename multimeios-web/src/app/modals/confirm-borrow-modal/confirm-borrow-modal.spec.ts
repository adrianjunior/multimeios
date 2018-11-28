import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBorrowModal } from './confirm-borrow-modal';

describe('ConfirmBorrowModal', () => {
  let component: ConfirmBorrowModal;
  let fixture: ComponentFixture<ConfirmBorrowModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBorrowModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBorrowModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
