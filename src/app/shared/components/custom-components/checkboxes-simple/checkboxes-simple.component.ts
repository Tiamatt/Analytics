/*
Note: call from other places:
<app-checkboxes-simple [input]='priceRanges' (onChangeOutput)="onPriceRangesChecked($event)"></app-checkboxes-simple>

Note: populate data for CheckboxesSimpleClass
populatePriceRanges(){
    this.filterApiService.getPriceRanges().subscribe(
      res => {
        console.log(res);
        this.priceRanges = new CheckboxesSimpleClass("priceRanges_1", res);
        this.priceRanges.isStyleBorder = true;
        this.priceRanges.title = "Price";
      },
      err => {
        console.log("Error. Can't call GetPriceRanges() HttpGet method");
      }
    );
}

Note: get all checked/unchecked values
onPriceRangesChecked(checkedPriceRanges: TextValueCheckedModel[]){
  // console.log('onPriceRangesChecked');
  // console.log(checkedPriceRanges);
}
*/

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckboxesSimpleClass } from './checkboxes-simple.model';
import { TextValueCheckedModel } from '../../../models/text-value-checked.model';

@Component({
  selector: 'app-checkboxes-simple',
  templateUrl: './checkboxes-simple.component.html',
  styleUrls: ['./checkboxes-simple.component.css']
})

export class CheckboxesSimpleComponent implements OnInit {

  @Input() input: CheckboxesSimpleClass;
  @Output() onChangeOutput = new EventEmitter<TextValueCheckedModel[]>();

  constructor() { }

  ngOnInit() { }

  onChange(){
    this.onChangeOutput.emit(this.input.options);
  }

}
