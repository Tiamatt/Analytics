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
  sizes: CheckboxesSimpleClass;
  colors: CheckboxesSimpleClass;

  constructor(private filterApiService: FilterApiService) { }

  ngOnInit() {
    if(this.input.isShowCategory_chb)
      this.populateCategories();
    if(this.input.isShowBrand_chb)  
      this.populateBrands();
    if(this.input.isShowSize_chb)  
      this.populateSizes();
    if(this.input.isShowColor_chb)  
      this.populateColors();
  }

   /* -------------------  PRIVATE METHODS ---------------------- */
  populateCategories(){
    this.filterApiService.getCategories().subscribe(
      res => {
        this.categories = new CheckboxesSimpleClass("categories_1", res);
        this.categories.isStyleBorder = true;
        this.categories.title = "Category";
      },
      err => {
        console.log("Error. Can't call GetCategories() HttpGet method");
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
      }
    );
  }
  populateSizes(){
    this.filterApiService.getSizes().subscribe(
      res => {
        this.sizes = new CheckboxesSimpleClass("sizes_1", res);
        this.sizes.isStyleBorder = true;
        this.sizes.title = "Size";
      },
      err => {
        console.log("Error. Can't call GetSizes() HttpGet method");
      }
    );
  }
  populateColors(){
    this.filterApiService.getColors().subscribe(
      res => {
        this.colors = new CheckboxesSimpleClass("colors_1", res);
        this.colors.isStyleBorder = true;
        this.colors.title = "Color";
      },
      err => {
        console.log("Error. Can't call GetColors() HttpGet method");
      }
    );
  }

  /* -------------------  EVENTS ---------------------- */
  onCategoryChecked(_checkedCategories: TextValueCheckedModel[]){
  }
  onBrandChecked(_checkedBrands: TextValueCheckedModel[]){
  }
  onColorChecked(_checkedBrands: TextValueCheckedModel[]){
  }
  onSizeChecked(_checkedBrands: TextValueCheckedModel[]){
  }
  onSearch(){
    if(this.categories)
      this.input.category = TextValueCheckedModel.getArrayOfSelectedValuesNum(this.categories.options);
    if(this.brands)
      this.input.brand = TextValueCheckedModel.getArrayOfSelectedValuesNum(this.brands.options);
    if(this.sizes)
      this.input.size = TextValueCheckedModel.getArrayOfSelectedValuesNum(this.sizes.options);
    if(this.colors)
      this.input.color = TextValueCheckedModel.getArrayOfSelectedValuesNum(this.colors.options);
    // output
    this.onSearchOutput.emit(this.input);
  }

}
