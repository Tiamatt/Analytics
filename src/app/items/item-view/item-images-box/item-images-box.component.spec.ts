import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemImagesBoxComponent } from './item-images-box.component';

describe('ItemImagesBoxComponent', () => {
  let component: ItemImagesBoxComponent;
  let fixture: ComponentFixture<ItemImagesBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemImagesBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemImagesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
