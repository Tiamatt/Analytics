/*
Note: call from other places:
<app-color-size-matrix-box [colorSizeMatrixInputModel]="colorSizeMatrix"></app-color-size-matrix-box>

Note: populate data for CheckboxesSimpleClass
// note, for forceToRefresh call the whole populateColorSizeMatrix() method
// if you change just this.colorSizeMatrix.forceToRefresh, it will not fire ngOnChanges() 
private populateColorSizeMatrix(){
  this.colorSizeMatrix = new ColorSizeMatrixInputModel();
  this.colorSizeMatrix.itemId = this.itemIdInput;
  this.colorSizeMatrix.isShowAddDetailsLink = false;
  this.colorSizeMatrix.isShowViewDetailsLink = false;
  this.colorSizeMatrix.forceToRefresh = (this.colorSizeMatrix.forceToRefresh) ? !this.colorSizeMatrix.forceToRefresh : true;
}
*/


import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ColorSizeMatrixModel } from './color-size-matrix.model';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';
import { ColorSizeMatrixInputModel } from './color-size-matrix-input.model';

@Component({
  selector: 'app-color-size-matrix-box',
  templateUrl: './color-size-matrix-box.component.html',
  styleUrls: ['./color-size-matrix-box.component.css', '../../../shared/styles/general.css']
})

export class ColorSizeMatrixBoxComponent implements OnChanges {
  @Input() colorSizeMatrixInputModel: ColorSizeMatrixInputModel;
  
  matrixData: ColorSizeMatrixModel;

  constructor(private itemApiService: ItemApiService) { }

  ngOnChanges(_changes: SimpleChanges){
    if(_changes.colorSizeMatrixInputModel != undefined)
      this.populateMatrixData();
  }

  /* -------------------  PRIVATE METHODS ---------------------- */
  populateMatrixData(){
    this.itemApiService.getColorSizeMatrix(this.colorSizeMatrixInputModel.itemId).subscribe(
      res => this.matrixData = res,
      err => {
        console.log("Error. Can't call GetColorSizeMatrix() HttpGet method");
      }
    );
  }


}
