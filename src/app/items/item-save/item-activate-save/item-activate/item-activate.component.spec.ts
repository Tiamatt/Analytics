import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemActivateComponent } from './item-activate.component';

describe('ItemActivateComponent', () => {
  let component: ItemActivateComponent;
  let fixture: ComponentFixture<ItemActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
