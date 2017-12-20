import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsViewComponent } from './item-details-view.component';

describe('ItemDetailsViewComponent', () => {
  let component: ItemDetailsViewComponent;
  let fixture: ComponentFixture<ItemDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
