import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { FilterApiService } from '../../../shared/services/api/filterApi.service';
import { CheckboxesSimpleClass } from '../../../shared/models/models-for-components/CheckboxesSimple.model';
import { IIdNameChecked } from '../../../shared/models/IIdNameChecked.model';
import { RadiobuttonsSimpleClass } from '../../../shared/models/models-for-components/RadiobuttonsSimple.model';


@Component({
  selector: 'app-item-general-save',
  templateUrl: './item-general-save.component.html',
  styleUrls: ['./item-general-save.component.css', '../../../shared/styles/general.css']
})
export class ItemGeneralSaveComponent implements OnInit {
  itemForm: FormGroup;
  genders: RadiobuttonsSimpleClass;
  categories: RadiobuttonsSimpleClass;
  brands: RadiobuttonsSimpleClass;

  constructor(
    private filterApiService: FilterApiService
  ) { }

  ngOnInit() {
    this.populateGenders();
    this.populateCategories();
    this.populateBrands();
    //this.generateItemForm();
  }

  // generateItemForm(){ 
  //   this.itemForm = new FormGroup({
      
  //   });
  // }

  /* -------------- Populate controls ------------------------- */
  populateGenders(){
    this.filterApiService.getGenders().subscribe(
      res => {
        this.genders = new RadiobuttonsSimpleClass("genders_1", res);
        this.genders.isStyleBorder = true;
        this.genders.title = "Gender";
        this.genders.selectedId = this.genders.options[0].id;
      },
      err => {
        console.log("Error. Can't call GetGenders() HttpGet method");
      }
    );
  }  
  populateCategories(){
    this.filterApiService.getCategories().subscribe(
      res => {
        this.categories = new RadiobuttonsSimpleClass("categories_1", res);
        this.categories.isStyleBorder = true;
        this.categories.title = "Category";
        this.categories.selectedId = this.categories.options[0].id;
      },
      err => {
        console.log("Error. Can't call GetCategories() HttpGet method");
      }
    );
  }
  populateBrands(){
      this.filterApiService.getBrands().subscribe(
        res => {
          this.brands = new RadiobuttonsSimpleClass("brands_1", res);
          this.brands.isStyleBorder = true;
          this.brands.title = "Brand";
          this.brands.selectedId = this.brands.options[0].id;
        },
        err => {
          console.log("Error. Can't call GetBrands() HttpGet method");
        }
      );
  }


  /* -------------- Get selected options from controls ------------------------- */
  onGenderSelected(_selectedGenderId: number){
  }
  onCategorySelected(_selectedCategoryId: number){  
    console.log('selected category is ' + _selectedCategoryId);
  }  
  onBrandSelected(_selectedBrandId: number){
    // console.log('onBrandSelected');
    // console.log(_selectedBrandId);
  }

}