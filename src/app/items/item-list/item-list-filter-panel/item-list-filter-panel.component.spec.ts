import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListFilterPanelComponent } from './item-list-filter-panel.component';

describe('ItemListFilterPanelComponent', () => {
  let component: ItemListFilterPanelComponent;
  let fixture: ComponentFixture<ItemListFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
