import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckboxesSimpleClass } from '../../../shared/models/models-for-components/CheckboxesSimple.model';
import { FilterApiService } from '../../../shared/services/api/filterApi.service';
import { IIdNameChecked } from '../../../shared/models/IIdNameChecked.model';
import { ItemListFilterPanelClass } from '../../../shared/models/ItemListFilterPanel.model';

@Component({
  selector: 'app-item-list-filter-panel',
  templateUrl: './item-list-filter-panel.component.html',
  styleUrls: ['./item-list-filter-panel.component.css', '../../../shared/styles/general.css']
})
export class ItemListFilterPanelComponent implements OnInit {
  
  @Input() input: ItemListFilterPanelClass;
  @Output() onSearchOutput = new EventEmitter<ItemListFilterPanelClass>();
  
  categories: CheckboxesSimpleClass;
  brands: CheckboxesSimpleClass;
  
  constructor(private filterApiService: FilterApiService) { }

  ngOnInit() {
    if(this.input.isShowCategory_chb)
      this.populateCategories();
    if(this.input.isShowBrand_chb)  
      this.populateBrands();
  }

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

  onCategoryChecked(_checkedCategories: IIdNameChecked[]){
  }
  onBrandChecked(_checkedBrands: IIdNameChecked[]){
  }

  onSearch(){
    this.input.category = this.getSelectedValues(this.categories.options);
    this.input.brand = this.getSelectedValues(this.brands.options);
    console.log("onSearch"); // kali
    console.log(this.input); // kali
    this.onSearchOutput.emit(this.input);
  }

  private getSelectedValues(_idNameCheckedArr: IIdNameChecked[])
  {
    let result: number[] = [];
    for(let i=0; i<_idNameCheckedArr.length; i++){
      if(_idNameCheckedArr[i].checked)
        result.push(_idNameCheckedArr[i].id);
    }
    return result;
  }

}
