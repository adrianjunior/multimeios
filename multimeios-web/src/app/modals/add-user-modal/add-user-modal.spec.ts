import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserModal } from './add-user-modal';

describe('AddUserModal', () => {
  let component: AddUserModal;
  let fixture: ComponentFixture<AddUserModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
