import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { FilterApiService } from '../../shared/services/api/filterApi.service';
import { CheckboxSimpleClass } from '../../shared/models/CheckboxSimple.model';
import { IIdNameChecked } from '../../shared/models/IIdNameChecked.model';

@Component({
  selector: 'app-item-save',
  templateUrl: './item-save.component.html',
  styleUrls: ['./item-save.component.css', '../../shared/styles/general.css']
})
export class ItemSaveComponent implements OnInit {
  title: string = "Create new item";
  itemForm: FormGroup;
  brands: CheckboxSimpleClass;
  priceRanges: CheckboxSimpleClass;

  constructor(
    private filterApiService: FilterApiService
  ) { }

  ngOnInit() {
    this.populateBrands();
    this.populatePriceRanges();
    //this.generateItemForm();
  }

  // generateItemForm(){ 
  //   this.itemForm = new FormGroup({
      
  //   });
  // }

  populateBrands(){
    this.filterApiService.getBrands().subscribe(
      res => {
        this.brands = new CheckboxSimpleClass("brands_1", res);
        this.brands.isStyleBorder = true;
        this.brands.title = "Brands";
      },
      err => {
        console.log("Error. Can't call GetBrands() HttpGet method");
      }
    );
  }

  onBrandsChecked(checkedBrands: IIdNameChecked[]){
    console.log('onBrandsChecked');
    console.log(checkedBrands);
  }

  populatePriceRanges(){
    this.filterApiService.getPriceRanges().subscribe(
      res => {
        console.log(res);
        this.priceRanges = new CheckboxSimpleClass("priceRanges_1", res);
        this.priceRanges.isStyleBorder = true;
        this.priceRanges.title = "Price";
      },
      err => {
        console.log("Error. Can't call GetPriceRanges() HttpGet method");
      }
    );
  }

  onPriceRangesChecked(checkedPriceRanges: IIdNameChecked[]){
    console.log('onPriceRangesChecked');
    console.log(checkedPriceRanges);
  }

}
