import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemImageSaveComponent } from './item-image-save.component';

describe('ItemImageSaveComponent', () => {
  let component: ItemImageSaveComponent;
  let fixture: ComponentFixture<ItemImageSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemImageSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemImageSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
