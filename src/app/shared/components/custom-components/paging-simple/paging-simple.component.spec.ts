import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingSimpleComponent } from './paging-simple.component';

describe('PagingSimpleComponent', () => {
  let component: PagingSimpleComponent;
  let fixture: ComponentFixture<PagingSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
