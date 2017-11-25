import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailSaveComponent } from './item-detail-save.component';

describe('ItemDetailSaveComponent', () => {
  let component: ItemDetailSaveComponent;
  let fixture: ComponentFixture<ItemDetailSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
