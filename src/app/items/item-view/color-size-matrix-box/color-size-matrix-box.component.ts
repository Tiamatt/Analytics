import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ColorSizeMatrixModel } from './color-size-matrix.model';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';

@Component({
  selector: 'app-color-size-matrix-box',
  templateUrl: './color-size-matrix-box.component.html',
  styleUrls: ['./color-size-matrix-box.component.css']
})

export class ColorSizeMatrixBoxComponent implements OnChanges {
  @Input() itemIdInput: string; // guid
  @Input() isShowViewDetails: boolean;
  
  matrixData: ColorSizeMatrixModel;

  constructor(private itemApiService: ItemApiService) { }

  ngOnChanges(_changes: SimpleChanges){
    if(_changes.itemIdInput != undefined)
    {
      //this.itemIdInput = _changes.itemIdInput.currentValue;
      this.populateMatrixData();
    }
  }

  /* -------------------  PRIVATE METHODS ---------------------- */
  populateMatrixData(){
    this.itemApiService.getColorSizeMatrix(this.itemIdInput).subscribe(
      res => this.matrixData = res,
      err => {
        console.log("Error. Can't call GetColorSizeMatrix() HttpGet method");
      }
    );
  }


}
