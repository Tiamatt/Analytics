import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSizeMatrixBoxComponent } from './color-size-matrix-box.component';

describe('ColorSizeMatrixBoxComponent', () => {
  let component: ColorSizeMatrixBoxComponent;
  let fixture: ComponentFixture<ColorSizeMatrixBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorSizeMatrixBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSizeMatrixBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
