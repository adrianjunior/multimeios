import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateUserEmailModal } from './validate-user-email-modal';

describe('ValidateUserEmailModal', () => {
  let component: ValidateUserEmailModal;
  let fixture: ComponentFixture<ValidateUserEmailModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateUserEmailModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateUserEmailModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
