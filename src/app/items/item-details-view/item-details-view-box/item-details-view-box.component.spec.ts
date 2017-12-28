import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsViewBoxComponent } from './item-details-view-box.component';

describe('ItemDetailsViewBoxComponent', () => {
  let component: ItemDetailsViewBoxComponent;
  let fixture: ComponentFixture<ItemDetailsViewBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailsViewBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsViewBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
