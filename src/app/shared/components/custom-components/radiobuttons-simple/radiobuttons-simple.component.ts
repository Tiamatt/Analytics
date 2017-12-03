/*
Note: call from other places:
<app-radiobuttons-simple [input]='brands' (onSelectedOutput)="onBrandSelected($event)"></app-radiobuttons-simple>

Note: populate data for RadiobuttonsSimpleClass
  populateBrands(){
      this.filterApiService.getBrands().subscribe(
        res => {
          this.brands = new RadiobuttonsSimpleClass("brands_1", res);
          this.brands.isStyleBorder = true;
          this.brands.title = "Brand";
        },
        err => {
          console.log("Error. Can't call GetBrands() HttpGet method");
        }
      );
  }

Note: get single selected value
  onBrandSelected(selectedBrandId: number){
    // console.log(selectedBrandId);
  }
*/

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RadiobuttonsSimpleClass } from './radiobuttons-simple.model';

@Component({
  selector: 'app-radiobuttons-simple',
  templateUrl: './radiobuttons-simple.component.html',
  styleUrls: ['./radiobuttons-simple.component.css']
})

export class RadiobuttonsSimpleComponent implements OnInit {

  @Input() input: RadiobuttonsSimpleClass;
  @Output() onSelectedOutput = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  onSelect(_checkedId: number){
    this.onSelectedOutput.emit(_checkedId);
  }

}
