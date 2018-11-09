import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalListComponent } from './medal-list.component';

describe('MedalListComponent', () => {
  let component: MedalListComponent;
  let fixture: ComponentFixture<MedalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
