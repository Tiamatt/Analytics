import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesSimpleComponent } from './checkboxes-simple.component';

describe('CheckboxesSimpleComponent', () => {
  let component: CheckboxesSimpleComponent;
  let fixture: ComponentFixture<CheckboxesSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxesSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxesSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
