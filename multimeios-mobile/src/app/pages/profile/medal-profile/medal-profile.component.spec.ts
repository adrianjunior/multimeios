import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalProfileComponent } from './medal-profile.component';

describe('MedalProfileComponent', () => {
  let component: MedalProfileComponent;
  let fixture: ComponentFixture<MedalProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedalProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
