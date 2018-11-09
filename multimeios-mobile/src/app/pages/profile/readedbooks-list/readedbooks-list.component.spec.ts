import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadedbooksListComponent } from './readedbooks-list.component';

describe('ReadedbooksListComponent', () => {
  let component: ReadedbooksListComponent;
  let fixture: ComponentFixture<ReadedbooksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadedbooksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadedbooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
