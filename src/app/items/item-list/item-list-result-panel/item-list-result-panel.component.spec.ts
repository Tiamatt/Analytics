import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListResultPanelComponent } from './item-list-result-panel.component';

describe('ItemListResultPanelComponent', () => {
  let component: ItemListResultPanelComponent;
  let fixture: ComponentFixture<ItemListResultPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListResultPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListResultPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
