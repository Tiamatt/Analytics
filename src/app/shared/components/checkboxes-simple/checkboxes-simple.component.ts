/*
Note: call from other places:
<app-checkboxes-simple [input]='brands' (onChangeOutput)="onBrandsChecked($event)"></app-checkboxes-simple>
*/

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckboxSimpleClass } from '../../models/CheckboxSimple.model';
import { IIdNameChecked } from '../../models/IIdNameChecked.model';

@Component({
  selector: 'app-checkboxes-simple',
  templateUrl: './checkboxes-simple.component.html',
  styleUrls: ['./checkboxes-simple.component.css']
})
export class CheckboxesSimpleComponent implements OnInit {
  @Input() input: CheckboxSimpleClass;
  @Output() onChangeOutput = new EventEmitter<IIdNameChecked[]>();
  constructor() { }

  ngOnInit() {
  }
  onChange(){
    this.onChangeOutput.emit(this.input.options);
  }

}
