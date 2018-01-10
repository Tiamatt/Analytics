import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemActivateSaveComponent } from './item-activate-save.component';

describe('ItemActivateSaveComponent', () => {
  let component: ItemActivateSaveComponent;
  let fixture: ComponentFixture<ItemActivateSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemActivateSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemActivateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
