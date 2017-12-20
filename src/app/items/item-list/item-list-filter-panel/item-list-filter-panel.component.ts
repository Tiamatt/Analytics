/*
Note: call from other components:
<app-item-list-filter-panel [input]="itemListFilterPanel" (onSearchOutput)="onFiltersSearch($event)"></app-item-list-filter-panel>

Note: populate input
populateItemListFilterPanel(){
  this.itemListFilterPanel = ItemListFilterPanelModel.initializeObject();
  this.itemListFilterPanel.isShowPartialName_txt = true;
  this.itemListFilterPanel.isShowActive_ddl = true;
  this.itemListFilterPanel.isShowGender_ddl = true;
  this.itemListFilterPanel.isShowCategory_chb = true;
  this.itemListFilterPanel.isShowBrand_chb = true;
}

Note: get output event
 onFiltersSearch(_filters: ItemListFilterPanelModel){
    console.log(_filters);
  }
*/


import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterApiService } from '../../../shared/services/api/filterApi.service';
import { CheckboxesSimpleClass } from '../../../shared/components/custom-components/checkboxes-simple/checkboxes-simple.model';
import { TextValueCheckedModel } from '../../../shared/models/text-value-checked.model';
import { ItemListFilterPanelModel } from './item-list-filter-panel.model';

@Component({
  selector: 'app-item-list-filter-panel',
  templateUrl: './item-list-filter-panel.component.html',
  styleUrls: ['./item-list-filter-panel.component.css', '../../../shared/styles/general.css']
})
export class ItemListFilterPanelComponent implements OnInit {  
  @Input() input: ItemListFilterPanelModel;
  @Output() onSearchOutput = new EventEmitter<ItemListFilterPanelModel>();
  
  categories: CheckboxesSimpleClass;
  brands: CheckboxesSimpleClass;
  
  constructor(private filterApiService: FilterApiService) { }

  ngOnInit() {
    if(this.input.isShowCategory_chb)
      this.populateCategories();
    if(this.input.isShowBrand_chb)  
      this.populateBrands();
  }

  /* -------------------  POPULATE ---------------------- */
  populateCategories(){
    this.filterApiService.getCategories().subscribe(
      res => {
        this.categories = new CheckboxesSimpleClass("categories_1", res);
        this.categories.isStyleBorder = true;
        this.categories.title = "Category";
      },
      err => {
        console.log("Error. Can't call GetCategories() HttpGet method");
        console.log(err);
      }
    );
  }
  populateBrands(){
    this.filterApiService.getBrands().subscribe(
      res => {
        this.brands = new CheckboxesSimpleClass("brands_1", res);
        this.brands.isStyleBorder = true;
        this.brands.title = "Brand";
      },
      err => {
        console.log("Error. Can't call GetBrands() HttpGet method");
        console.log(err);
      }
    );
  }


  /* -------------------  EVENTS ---------------------- */
  onCategoryChecked(_checkedCategories: TextValueCheckedModel[]){
  }
  onBrandChecked(_checkedBrands: TextValueCheckedModel[]){
  }
  onSearch(){
    this.input.category = TextValueCheckedModel.getArrayOfSelectedValuesNum(this.categories.options);
    this.input.brand = TextValueCheckedModel.getArrayOfSelectedValuesNum(this.brands.options);
    // output
    this.onSearchOutput.emit(this.input);
  }

}
