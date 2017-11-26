import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { FilterApiService } from '../../../shared/services/api/filterApi.service';
import { CheckboxesSimpleClass } from '../../../shared/models/models-for-components/CheckboxesSimple.model';
import { IIdNameChecked } from '../../../shared/models/IIdNameChecked.model';
import { RadiobuttonsSimpleClass } from '../../../shared/models/models-for-components/RadiobuttonsSimple.model';
import { ItemClass } from '../../../shared/models/Item.model';
import { RequiredWithTrimValidator } from '../../../shared/custom-directives/validators/required-with-trim.validator';
import { Observable } from 'rxjs/Observable';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';

@Component({
  selector: 'app-item-general-save',
  templateUrl: './item-general-save.component.html',
  styleUrls: ['./item-general-save.component.css', '../../../shared/styles/general.css']
})

export class ItemGeneralSaveComponent implements OnInit {
  item: ItemClass = new ItemClass();
  itemForm: FormGroup;
  genders: RadiobuttonsSimpleClass;
  categories: RadiobuttonsSimpleClass;
  brands: RadiobuttonsSimpleClass;
  // for validation
  existingItemNames: string[] = []; // to check if item name is unique
  isShowAllValidations: boolean = false;
  isGenderValid: boolean = false;
  isCategoryValid: boolean = false;
  isBrandValid: boolean = false;

  constructor(
    private filterApiService: FilterApiService,
    private itemApiService: ItemApiService
  ) { }

  ngOnInit() {
    this.populateGenders();
    this.populateCategories();
    this.populateBrands();
    this.populateExistingItemNames();
    this.generateItemForm();
  }

  generateItemForm(){ 
    this.itemForm = new FormGroup({
      'itemName': new FormControl(null, [RequiredWithTrimValidator, this.forbiddenItemNameValidator.bind(this), Validators.maxLength(50)]),
      'itemDescription': new FormControl(null, [RequiredWithTrimValidator, Validators.maxLength(2000)]),
      'price': new FormControl(null, [RequiredWithTrimValidator, Validators.pattern('^[0-9]+\.[0-9][0-9]$')])
    });
  }

  /* -------------- Populate controls ------------------------- */  
  populateGenders(){
    this.filterApiService.getGenders().subscribe(
      res => {
        this.genders = new RadiobuttonsSimpleClass("genders_1", res);
        this.genders.isStyleBorder = true;
        this.genders.title = "Gender";
        //this.genders.selectedId = this.genders.options[0].id;
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
        //this.categories.selectedId = this.categories.options[0].id;
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
          //this.brands.selectedId = this.brands.options[0].id;
        },
        err => {
          console.log("Error. Can't call GetBrands() HttpGet method");
        }
      );
  }
  populateExistingItemNames(){
    this.itemApiService.getItemNamesLowercase().subscribe(
      res => this.existingItemNames = res,
      err => {
        console.log("Error. Can't call GetItemNamesLowercase() HttpGet method");
      }
    );
  }


  /* -------------- Get selected options from controls ------------------------- */
  onGenderSelected(_selectedGenderId: number){
      this.item.genderId = _selectedGenderId;
      this.isGenderValid = true;
  }
  onCategorySelected(_selectedCategoryId: number){  
    this.item.categoryId = _selectedCategoryId;
    this.isCategoryValid = true;
  }  
  onBrandSelected(_selectedBrandId: number){
    this.item.brandId = _selectedBrandId;
    this.isBrandValid = true;
  }

  /* -------------- Validations ------------------------- */
  // itemName should be unique
  forbiddenItemNameValidator(control: FormControl){
    if(control.value == undefined) 
      return null; // if empty, then allow another validation handle it
    else if (this.existingItemNames.indexOf(control.value.trim().toLowerCase())> -1)
      return ({'forbiddenItemName': true });
      // the same as
      // return ({forbiddenItemName: {valid: false} });
    else
      return null;
  }

  /* -------------- Buttons ------------------------- */
  // "Save" button
  onSave(){
    if(!this.itemForm.valid)      
      this.isShowAllValidations = true;
    else if(this.item.genderId == undefined || this.item.genderId < 1)
    {
      this.isGenderValid = false;
      this.isShowAllValidations = true;
    }
    else if(this.item.categoryId  == undefined || this.item.categoryId < 1)
    {
      this.isCategoryValid = false;
      this.isShowAllValidations = true;
    }
    else if(this.item.brandId  == undefined || this.item.brandId < 1)
    {
      this.isBrandValid = false;
      this.isShowAllValidations = true;
    }
    else
    {
      this.isShowAllValidations = false;
      this.item.name = this.itemForm.value.itemName.trim();
      this.item.description = this.itemForm.value.itemDescription.trim();
      this.item.price = this.itemForm.value.price;
      console.log(this.item);
    }
  }

  onNextClick(){
    // redirect
  }

}