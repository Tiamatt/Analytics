import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesAlphabetComponent } from './checkboxes-alphabet.component';

describe('CheckboxesAlphabetComponent', () => {
  let component: CheckboxesAlphabetComponent;
  let fixture: ComponentFixture<CheckboxesAlphabetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxesAlphabetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxesAlphabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
