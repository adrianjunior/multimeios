import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReturnModal } from './confirm-return-modal';

describe('ConfirmReturnModalComponent', () => {
  let component: ConfirmReturnModal;
  let fixture: ComponentFixture<ConfirmReturnModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmReturnModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReturnModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
