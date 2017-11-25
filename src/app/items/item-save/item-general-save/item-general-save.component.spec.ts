import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGeneralSaveComponent } from './item-general-save.component';

describe('ItemGeneralSaveComponent', () => {
  let component: ItemGeneralSaveComponent;
  let fixture: ComponentFixture<ItemGeneralSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGeneralSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGeneralSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
