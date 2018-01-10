import { Component, OnChanges, Input } from '@angular/core';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';
import { ItemViewModel } from '../item-view.model';
import { ColorSizeMatrixInputModel } from '../color-size-matrix-box/color-size-matrix-input.model';

@Component({
  selector: 'app-item-view-box',
  templateUrl: './item-view-box.component.html',
  styleUrls: ['./item-view-box.component.css', '../../../shared/styles/general.css']
})
export class ItemViewBoxComponent implements OnChanges {
  @Input() itemIdInput: string; // itemId (guid)
  colorSizeMatrixInputModel: ColorSizeMatrixInputModel;
  itemView: ItemViewModel;

  constructor(private itemApiService: ItemApiService) { }

  ngOnChanges() {
    this.populateItemView();
    this.populateColorSizeMatrixInputModel();
  }

  /* -------------------  PRIVATE METHODS ---------------------- */
  private populateItemView(){
    this.itemApiService.getItemView(this.itemIdInput).subscribe(
      res => this.itemView = res,
      err => {
        console.log("Error. Can't call GetItemView(x) HttpGet method");
      }
    )
  }

  private populateColorSizeMatrixInputModel(){
    this.colorSizeMatrixInputModel = new ColorSizeMatrixInputModel();
    this.colorSizeMatrixInputModel.itemId = this.itemIdInput;
    this.colorSizeMatrixInputModel.isShowAddDetailsLink = false;
    this.colorSizeMatrixInputModel.isShowViewDetailsLink = false;
    this.colorSizeMatrixInputModel.forceToRefresh = true;
  }

  /* -------------------  EVENTS ---------------------- */
  onEditItem(){
    document.getElementById("openModalAlert").click();
  }

  onEditItemFromChild(_isSucceded){
    if(_isSucceded)
      this.populateItemView();
  }
}
