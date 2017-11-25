import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiobuttonsSimpleComponent } from './radiobuttons-simple.component';

describe('RadiobuttonsSimpleComponent', () => {
  let component: RadiobuttonsSimpleComponent;
  let fixture: ComponentFixture<RadiobuttonsSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiobuttonsSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonsSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
