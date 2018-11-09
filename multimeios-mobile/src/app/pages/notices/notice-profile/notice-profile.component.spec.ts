import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeProfileComponent } from './notice-profile.component';

describe('NoticeProfileComponent', () => {
  let component: NoticeProfileComponent;
  let fixture: ComponentFixture<NoticeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
