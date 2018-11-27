import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateUserEmailComponent } from './validate-user-email.component';

describe('ValidateUserEmailComponent', () => {
  let component: ValidateUserEmailComponent;
  let fixture: ComponentFixture<ValidateUserEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateUserEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateUserEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
