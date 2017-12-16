import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { FilterApiService } from '../../../shared/services/api/filterApi.service';
import { ItemModel } from '../../../shared/models/item.model';
import { RequiredWithTrimValidator } from '../../../shared/custom-directives/validators/required-with-trim.validator';
import { Observable } from 'rxjs/Observable';
import { ItemApiService } from '../../../shared/services/api/itemApi.service';
import { RadiobuttonsSimpleClass } from '../../../shared/components/custom-components/radiobuttons-simple/radiobuttons-simple.model';
import { TextValueCheckedModel } from '../../../shared/models/text-value-checked.model';

@Component({
  selector: 'app-item-general-save',
  templateUrl: './item-general-save.component.html',
  styleUrls: ['./item-general-save.component.css', '../../../shared/styles/general.css']
})

export class ItemGeneralSaveComponent implements OnInit, OnChanges {
  @Input() itemIdInput:string; // guid
  title: string; // "Create new item"/"Update selected item" title names
  saveButtonName: string; // "Update"/"Create" button names
  itemsTvc: TextValueCheckedModel; // for ddl
  item: ItemModel; // for getting from db or saving to db
  itemForm: FormGroup;
  genders: RadiobuttonsSimpleClass; // for radiobuttons
  categories: TextValueCheckedModel; // for ddl
  brands: TextValueCheckedModel; // for ddl
  // following are for validations:
  existingItemNames: string[] = []; // to check if item name is unique
  isShowAllValidations: boolean = false;
  isGenderValid: boolean = false;

  constructor(
    private filterApiService: FilterApiService,
    private itemApiService: ItemApiService){ 
      this.item = new ItemModel();
  }
  
  ngOnInit() {
    this.populateItemsTvc();
    this.populateCategories();
    this.populateBrands();
    this.reinitializeData(this.itemIdInput);
  }
  ngOnChanges(_changes: SimpleChanges){
    if(_changes.itemIdInput != undefined)
    {
      this.itemIdInput = _changes.itemIdInput.currentValue;
      this.reinitializeData(this.itemIdInput);
    }
  }

  /* -------------------  PRIVATE METHODS ---------------------- */
  populateItemsTvc(){
    this.itemApiService.getItemsTvc(null).subscribe(
      res => this.itemsTvc = res,
      err => {
        console.log("Error. Can't call GetItemsTvc() HttpGet method");
      }
    );
  }
  populateGenders(){
    this.filterApiService.getGenders().subscribe(
      res => {
        this.genders = new RadiobuttonsSimpleClass("genders_1", res);
        this.genders.isStyleBorder = true;
        this.genders.title = "Gender";
        this.genders.selectedId = this.item.genderId;
      },
      err => {
        console.log("Error. Can't call GetGenders() HttpGet method");
      }
    );
  }  
  populateCategories(){
    this.filterApiService.getCategories().subscribe(
      res => this.categories = res,
      err => {
        console.log("Error. Can't call GetCategories() HttpGet method");
      }
    );
  }
  populateBrands(){
      this.filterApiService.getBrands().subscribe(
        res => this.brands = res,
        err => {
          console.log("Error. Can't call GetBrands() HttpGet method");
        }
      );
  }
  populateExistingItemNames(){
    this.itemApiService.getItemNamesLowercase(this.item.itemId).subscribe(
      res => {
        this.existingItemNames = res;
        this.generateItemForm();
      },
      err => {
        console.log("Error. Can't call GetItemNamesLowercase() HttpGet method");
      }
    );
  }
  populateSelectedItemModel(_itemId: string){
    this.itemApiService.getItemModel(_itemId).subscribe(
      res => { 
        this.item = res;
        this.populateGenders();
        this.populateExistingItemNames();
      },
      err => {
        console.log("Error. Can't call GetItemModel() HttpGet method");
      }
    );
  }
  reinitializeData(_itemId: string){
    if(_itemId != undefined && _itemId != "-1"){ // update
      this.title = "Update selected item";
      this.saveButtonName = "Update"; 
      this.isGenderValid = true;
      this.populateSelectedItemModel(_itemId);
    }
    else { // create
      this.item = new ItemModel();
      this.title = "Create new item";
      this.saveButtonName = "Create";
      this.isGenderValid = false;
      this.populateItemsTvc();
      this.populateGenders();
      this.populateExistingItemNames();
    }
  }
  generateItemForm(){
    let price = (this.item.price) ? this.item.price.toString() : null;
    let categoryId = (this.item.categoryId) ? this.item.categoryId : -1;
    let brandId = (this.item.brandId) ? this.item.brandId : -1;
    this.itemForm = new FormGroup({
      'itemName': new FormControl(this.item.name, [RequiredWithTrimValidator, this.forbiddenItemNameValidator.bind(this), Validators.maxLength(50)]),
      'itemDescription': new FormControl(this.item.description, [RequiredWithTrimValidator, Validators.maxLength(2000)]),
      'categoryId': new FormControl(categoryId, Validators.min(1)),
      'brandId': new FormControl(brandId, Validators.min(1)),
      'price': new FormControl(price, [RequiredWithTrimValidator, Validators.pattern('^[0-9]+\.[0-9][0-9]$')])
    });
  }
  // validation - itemName should be unique
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

  /* -------------------  EVENTS ---------------------- */
  // when user select item form the list, then UPDATE
  // otherwise CREATE
  onItemsTvsSelected(_event:any){
    let selectedItemId: string = _event.target.value;
    this.reinitializeData(selectedItemId);
  }
  // get selected Gender from Custom RadiobuttonsSimple
  onGenderSelected(_selectedGenderId: number){
      this.item.genderId = _selectedGenderId;
      this.isGenderValid = true;
  }
  // "Save" button ("Update"/"Create" button)
  onSave(){
    if(!this.itemForm.valid)      
      this.isShowAllValidations = true;
    else if(this.item.genderId == undefined || this.item.genderId < 1)
    {
      this.isGenderValid = false;
      this.isShowAllValidations = true;
    }
    else
    {     
      this.isShowAllValidations = false;

      // populate item object
      this.item.name = this.itemForm.value.itemName.trim();
      this.item.description = this.itemForm.value.itemDescription.trim();
      // this.item.gender was assigned in onGenderSelected() function
      this.item.categoryId = this.itemForm.value.categoryId;
      this.item.brandId = this.itemForm.value.brandId;
      this.item.price = this.itemForm.value.price;

      // save in db via api
      if(this.item.itemId){   
        this.itemApiService.updateItem(this.item).subscribe(
          res => {
            this.reinitializeData(this.itemIdInput);
            alert("Item updated successfully");
          },
          err => console.log(err.error)
        );
      }
      else{
        this.itemApiService.insertItem(this.item).subscribe(
          res => {
            this.reinitializeData(this.itemIdInput);
            alert("Item created successfully");
          },
          err => console.log(err.error)
        );
      }
    }
  }
  // "Reset" button
  onResetClick(){
    this.reinitializeData(this.itemIdInput);
  }

}