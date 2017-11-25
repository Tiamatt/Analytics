import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewBoxComponent } from './item-view-box.component';

describe('ItemViewBoxComponent', () => {
  let component: ItemViewBoxComponent;
  let fixture: ComponentFixture<ItemViewBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemViewBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemViewBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
